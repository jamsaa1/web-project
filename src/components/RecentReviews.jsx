import { useEffect, useState } from 'react'
import './RecentReviews.css'

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const fill = Math.min(Math.max(rating - index, 0), 1) * 100

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
  })
}

function RecentReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews/recent')

        if (!response.ok) {
          throw new Error('Arvostelujen lataaminen epäonnistui')
        }

        const data = await response.json()
        setReviews(data)
      } catch (err) {
        console.error('Arvostelujen haku epäonnistui:', err)
        setError('Arvosteluja ei voitu ladata')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <section className="recent-reviews">
        <h2>Viimeisimmät arvostelut</h2>
        <p>Ladataan arvosteluja...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="recent-reviews">
        <h2>Viimeisimmät arvostelut</h2>
        <p className="reviews-message">{error}</p>
      </section>
    )
  }

  return (
    <section className="recent-reviews">
      <h2>Viimeisimmät arvostelut</h2>

      {reviews.length === 0 ? (
        <p className="reviews-message">
          Ei vielä arvosteluja
        </p>
      ) : (
        <div className="recent-reviews-list">
          {reviews.map((review) => (
            <article className="recent-review" key={review.rating_id}>
              <div className="recent-review-header">
                <div>
                  <h3>{review.movie_name}</h3>
                  {review.movie_year && (
                    <span className="review-year">
                      {review.movie_year}
                    </span>
                  )}
                </div>

                <div className="review-rating">
                  <div className="review-stars">
                    {renderStars(Number(review.rating_starsnumber))}
                  </div>
                  <span>{Number(review.rating_starsnumber).toFixed(1)}/5</span>
                </div>
              </div>

              {review.rating_text && (
                <p className="review-text">{review.rating_text}</p>
              )}

              <div className="recent-review-footer">
                <span>{review.user_name}</span>
                <span>
                  {new Date(review.rating_created_at).toLocaleDateString('fi-FI')}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RecentReviews