import { useState } from "react";

function MovieSearch() {
  // Store the text entered by the user.
  const [query, setQuery] = useState("");

  // Store movies returned by the TMDB API.
  const [movies, setMovies] = useState([]);

  // Track loading and errors.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search for movies when the form is submitted.
  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `/api/movies/search?query=${encodeURIComponent(query.trim())}`
      );

      if (!response.ok) {
        throw new Error("Failed to search movies");
      }

      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Search Movies</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      <div className="movie-results">
        {movies.map((movie) => (
          <article key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                width="150"
              />
            )}

            <h3>{movie.title}</h3>
            <p>{movie.release_date?.slice(0, 4)}</p>
            <p>⭐ {movie.vote_average?.toFixed(1)}/10</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieSearch;
