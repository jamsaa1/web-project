import { useEffect, useState } from "react";
import AdvancedSearch, { DEFAULT_FILTERS } from "./AdvancedSearch";

const MOVIES_PER_PAGE = 15;
const MAX_PAGES = 100;
const VISIBLE_PAGES = 10;

function MovieSearch({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    years: [...DEFAULT_FILTERS.years],
    genres: [],
  }));

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Allows a new search even with the same title.
  const [searchVersion, setSearchVersion] = useState(0);

  // Handle a title passed from Navbar.
  useEffect(() => {
    setQuery(initialQuery);
    setActiveQuery(initialQuery);
    setCurrentPage(1);
  }, [initialQuery]);

  // Update filters and switch to Discover mode.
  function handleFiltersChange(newFilters) {
    setFilters(newFilters);
    setQuery("");
    setActiveQuery("");
    setCurrentPage(1);
  }

  // Submit normal title search.
  function handleSearch(event) {
    event.preventDefault();

    setActiveQuery(query.trim());

    // Reset advanced filters when searching by title.
    setFilters({
      ...DEFAULT_FILTERS,
      years: [...DEFAULT_FILTERS.years],
      genres: [],
    });

    setCurrentPage(1);
    setSearchVersion((version) => version + 1);
  }

  // Build the request URL.
  function buildSearchUrl() {
    const params = new URLSearchParams();

    params.set("page", String(currentPage));

    if (activeQuery.trim()) {
      params.set("query", activeQuery.trim());

      return `/api/movies/search?${params.toString()}`;
    }

    params.set("fromYear", String(filters.years[0]));
    params.set("toYear", String(filters.years[1]));
    params.set("rating", String(filters.rating));
    params.set("sort", filters.sort);

    if (filters.actor.trim()) {
      params.set("actor", filters.actor.trim());
    }

    if (filters.genres.length > 0) {
      params.set("genres", filters.genres.join(","));
    }

    return `/api/movies/discover?${params.toString()}`;
  }

  // Load results whenever a search parameter changes.
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(buildSearchUrl(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          throw new Error(
            errorData.error || `Search failed: HTTP ${response.status}`
          );
        }

        const data = await response.json();

        if (controller.signal.aborted) return;

        setMovies(data.results ?? []);
        setTotalResults(data.totalResults ?? 0);
        setTotalPages(Math.min(data.totalPages ?? 0, MAX_PAGES));
        setCurrentPage(data.currentPage ?? currentPage);
        setHasSearched(true);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(err.message);
        setMovies([]);
        setTotalResults(0);
        setTotalPages(0);
        setHasSearched(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [activeQuery, filters, currentPage, searchVersion]);

  function changePage(page) {
    if (loading || page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  }

  const firstResult =
    totalResults > 0 ? (currentPage - 1) * MOVIES_PER_PAGE + 1 : 0;

  const lastResult = Math.min(currentPage * MOVIES_PER_PAGE, totalResults);

  // Dynamic pagination: 10 visible page numbers.
  const pageCount = Math.min(VISIBLE_PAGES, totalPages);

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor((VISIBLE_PAGES - 1) / 2),
      totalPages - pageCount + 1
    )
  );

  const visiblePages = Array.from(
    { length: pageCount },
    (_, index) => startPage + index
  );

  return (
    <section className="movie-search">
      <h2>Search Movies</h2>

      {/* Title search */}
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

      {/* Advanced filters */}
      <div className="advanced-search-wrapper">
        <AdvancedSearch
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      {/* Status */}
      {loading && <p>Searching...</p>}

      {error && <p className="movie-search-error">{error}</p>}

      {/* Results counter */}
      {!loading && !error && totalResults > 0 && (
        <div className="movie-results-header">
          <h3>{activeQuery ? "Search Results" : "Discover Movies"}</h3>

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

      {/* Movie grid */}
      <div className="movie-results">
        {movies.map((movie) => (
          <article key={movie.id}>
            <div className="movie-poster">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";

                    event.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }}
                />
              )}

              <div
                className="movie-poster-placeholder"
                style={{
                  display: movie.poster_path ? "none" : "flex",
                }}
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

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <>
          <nav className="movie-pagination" aria-label="Movie results pages">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </button>

            {visiblePages.map((page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "active" : ""}
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </nav>

          <p className="pagination-info">
            Page {currentPage} of {totalPages}
          </p>
        </>
      )}
    </section>
  );
}

export default MovieSearch;
