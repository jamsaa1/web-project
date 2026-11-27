import { useEffect, useState } from 'react'

import Logout from '../Logout'
import '../RecentReviews.css'
import './ProfilePage.css'

export default function ProfilePage({ user }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    async function fetchMyReviews() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('/api/reviews/mine', {
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Arvostelujen hakeminen epäonnistui.')
        }

        const data = await response.json()
        setReviews(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMyReviews()
  }, [user])

  return (
    <div>
      <h1 id="Otsikko">Oma profiili</h1>

      <div className="toimintoNapit">
        {user ? (
          <>
            <p>Tervetuloa, {user.name}!</p>
            <Logout />
          </>
        ) : (
          <>
            <a
              href="/kirjaudu"
              className="nav-link"
              style={{
                color: '#000',
                background: 'rgb(35, 102, 109)',
                width: '50%',
                padding: '5px',
                margin: '25px'
              }}
            >
              Kirjaudu sisään
            </a>

            <a
              href="/profiili/rekisteroidy"
              className="nav-link"
              style={{
                color: '#000',
                background: 'rgb(35, 102, 109)',
                width: '50%',
                padding: '5px',
                margin: '25px'
              }}
            >
              Rekisteröidy
            </a>
          </>
        )}
      </div>

      {user && (
        <section className="my-reviews">
          <h2>Omat arvostelut</h2>

          {loading && <p>Ladataan arvosteluja...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && reviews.length === 0 && (
            <p>Et ole vielä arvostellut yhtään elokuvaa.</p>
          )}

          <div className="my-reviews-list">
            {reviews.map((review) => (
              <article className="recent-review" key={review.rating_id}>
                <div className="recent-review-header">
                  <div>
                    <h3>
                      <a
                        href={`/elokuvat/${review.tmdb_id}`}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none'
                        }}
                      >
                        {review.movie_name}
                      </a>
                    </h3>

                    {review.movie_year && (
                      <span className="review-year">
                        {review.movie_year}
                      </span>
                    )}
                  </div>

                  <div className="review-rating">
                    <div className="review-stars">
                      {Array.from({ length: 5 }, (_, index) => {
                        const fill = Math.min(
                          Math.max(
                            Number(review.rating_starsnumber) - index,
                            0
                          ),
                          1
                        ) * 100

                        return (
                          <span className="review-star" key={index}>
                            <span
                              className="review-star-fill"
                              style={{ width: `${fill}%` }}
                            >
                              ★
                            </span>
                            <span className="review-star-empty">★</span>
                          </span>
                        )
                      })}
                    </div>

                    <span>
                      {Number(review.rating_starsnumber).toFixed(1)}/5
                    </span>
                  </div>
                </div>

                <p className="review-text">
                  {review.rating_text || 'Ei kirjallista arvostelua.'}
                </p>

                <div className="recent-review-footer">
                  <span>
                    Päivitetty: {new Date(
                      review.rating_updated_at || review.rating_created_at
                    ).toLocaleDateString('fi-FI')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}