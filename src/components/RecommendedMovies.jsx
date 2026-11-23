import { useEffect, useState } from 'react'
import './RecommendedMovies.css'

function RecommendedMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies/popular')

        if (!response.ok) {
          throw new Error('Elokuvien lataaminen epäonnistui')
        }

        const data = await response.json()
        setMovies(data.slice(0, 5))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <p>Ladataan suositeltuja elokuvia...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className="recommended-movies">
      <h2>Suositellut elokuvat</h2>

      <div className="recommended-movies-list">
        {movies.map((movie) => (
          <a
            href={`/elokuvat/${movie.id}`}
            className="recommended-movie"
            key={movie.id}
            aria-label={`Katso elokuvan ${movie.title} tiedot`}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </a>
        ))}
      </div>

      <a href="/elokuvat" className="recommended-movies-link">
        Näytä kaikki →
      </a>
    </section>
  )
}

export default RecommendedMovies