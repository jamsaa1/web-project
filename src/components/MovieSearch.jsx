import { useEffect, useRef, useState } from "react";
import AdvancedSearch from "./AdvancedSearch";

const MOVIES_PER_PAGE = 15;
const MAX_PAGES = 100;
const VISIBLE_PAGES = 10;

function MovieSearch({ initialQuery = "" }) {
  // Text entered by the user.
  const [query, setQuery] = useState(initialQuery);

  // Last submitted search query.
  const [activeQuery, setActiveQuery] = useState("");

  // Movies returned by our backend.
  const [movies, setMovies] = useState([]);

  // Search status and errors.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Pagination.
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Prevent older requests from overwriting newer results.
  const requestId = useRef(0);

  // Search movies using our Express backend.
  async function searchMovies(searchText, page = 1) {
    const text = searchText.trim();

    if (!text) return;

    const id = ++requestId.current;

    setLoading(true);
    setError("");
    setMovies([]);
    setActiveQuery(text);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/movies/search?query=${encodeURIComponent(text)}&page=${page}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.error || `Search failed: HTTP ${response.status}`
        );
      }

      const data = await response.json();

      // Ignore outdated requests.
      if (id !== requestId.current) return;

      setMovies(data.results ?? []);
      setTotalResults(data.totalResults ?? 0);
      setTotalPages(Math.min(data.totalPages ?? 0, MAX_PAGES));
      setCurrentPage(data.currentPage ?? page);
    } catch (err) {
      if (id !== requestId.current) return;

      setError(err.message);
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      if (id === requestId.current) {
        setLoading(false);
      }
    }
  }

  // Automatically search when URL contains a query.
  useEffect(() => {
    setQuery(initialQuery);

    if (initialQuery.trim()) {
      searchMovies(initialQuery, 1);
    }

    // Invalidate pending requests on cleanup.
    return () => {
      requestId.current += 1;
    };
  }, [initialQuery]);

  // Search when the form is submitted.
  function handleSearch(event) {
    event.preventDefault();
    searchMovies(query, 1);
  }

  // Change page and fetch movies from the backend.
  function changePage(page) {
    if (page < 1 || page > totalPages || page === currentPage || loading) {
      return;
    }

    searchMovies(activeQuery, page);
  }

  // Calculate the displayed result range.
  const firstResult =
    totalResults > 0 ? (currentPage - 1) * MOVIES_PER_PAGE + 1 : 0;

  const lastResult = Math.min(currentPage * MOVIES_PER_PAGE, totalResults);

  // ==========================================
  // DYNAMIC PAGINATION
  // ==========================================

  // Number of page buttons to show.
  const pageCount = Math.min(VISIBLE_PAGES, totalPages);

  // Keep the current page near the center
  // whenever possible.
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor((VISIBLE_PAGES - 1) / 2),
      totalPages - pageCount + 1
    )
  );

  // Last visible page number.
  const endPage = startPage + pageCount - 1;

  // Generate only the visible page numbers.
  const visiblePages = Array.from(
    { length: pageCount },
    (_, index) => startPage + index
  );

  return (
    <section className="movie-search">
      <h2>Search Movies</h2>

      {/* Main search form */}
      <form className="movie-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {/* Advanced search filters */}
      <div className="advanced-search-wrapper">
        <AdvancedSearch />
      </div>

      {/* Loading and error messages */}
      {loading && <p>Searching...</p>}

      {error && <p className="movie-search-error">{error}</p>}

      {/* Search results counter */}
      {!loading && !error && totalResults > 0 && (
        <div className="movie-results-header">
          <h3>Search Results</h3>

          <p>{totalResults} movies found</p>

          <span>
            Showing {firstResult}–{lastResult} of {totalResults}
          </span>
        </div>
      )}

      {/* No results */}
      {!loading && !error && hasSearched && totalResults === 0 && (
        <p className="movie-no-results">No movies found.</p>
      )}

      {/* Movie results */}
      <div className="movie-results">
        {movies.map((movie) => (
          <article key={movie.id}>
            <div className="movie-poster">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }}
                />
              ) : null}

              <div
                className="movie-poster-placeholder"
                style={{ display: movie.poster_path ? "none" : "flex" }}
              >
                <span>Picture Not Available</span>
              </div>
            </div>

            <a href={`/elokuvat/${movie.id}`} className="movie-title">
              {movie.title}
            </a>

            <p>{movie.release_date?.slice(0, 4)}</p>

            <p>⭐ {movie.vote_average?.toFixed(1)}/10</p>
          </article>
        ))}
      </div>

      {/* =====================================
          DYNAMIC PAGINATION
      ===================================== */}

      {!loading && !error && totalPages > 1 && (
        <nav className="movie-pagination" aria-label="Movie results pages">
          {/* Previous page */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </button>

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <button
              type="button"
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => changePage(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          {/* Next page */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </button>
        </nav>
      )}

      {/* Current page information */}
      {!loading && !error && totalPages > 1 && (
        <p className="pagination-info">
          Page {currentPage} of {totalPages}
        </p>
      )}
    </section>
  );
}

export default MovieSearch;
