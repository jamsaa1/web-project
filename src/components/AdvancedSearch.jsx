
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./AdvancedSearch.css";

const MIN_YEAR = 1888;
const MAX_YEAR = new Date().getFullYear();

export const DEFAULT_FILTERS = {
  years: [MIN_YEAR, MAX_YEAR],
  actor: "",
  genres: [],
  rating: 0,
  sort: "popularity.desc",
};

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

function AdvancedSearch({ filters, onFiltersChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function updateFilter(name, value) {
    onFiltersChange({
      ...filters,
      [name]: value,
    });
  }

  function toggleGenre(id) {
    const newGenres = filters.genres.includes(id)
      ? filters.genres.filter((genre) => genre !== id)
      : [...filters.genres, id];

    updateFilter("genres", newGenres);
  }

  function resetFilters() {
    onFiltersChange({
      ...DEFAULT_FILTERS,
      years: [...DEFAULT_FILTERS.years],
      genres: [],
    });
  }

  return (
    <div className="advanced-search">
      <button
        type="button"
        className="advanced-search-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Advanced Search {isOpen ? "▲" : "▼"}
      </button>

      {isOpen && (
        <div className="advanced-search-panel">

          <h3>Filter Movies</h3>

          {/* RELEASE YEARS */}
          <div className="filter-section">
            <label>
              Release year: {filters.years[0]} - {filters.years[1]}
            </label>

            <div className="year-range-container">
              <Range
                step={1}
                min={MIN_YEAR}
                max={MAX_YEAR}
                values={filters.years}
                onChange={(values) =>
                  updateFilter("years", values)
                }
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="year-range-track"
                    style={{
                      ...props.style,
                      background: getTrackBackground({
                        values: filters.years,
                        colors: [
                          "#ccc",
                          "#23666c",
                          "#ccc",
                        ],
                        min: MIN_YEAR,
                        max: MAX_YEAR,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => {
                  const { key, ...thumbProps } = props;

                  return (
                    <div
                      key={key}
                      {...thumbProps}
                      className="year-range-thumb"
                      aria-label={
                        index === 0
                          ? "Minimum release year"
                          : "Maximum release year"
                      }
                      style={thumbProps.style}
                    />
                  );
                }}
              />
            </div>

            <div className="year-range-labels">
              <span>{MIN_YEAR}</span>
              <span>{MAX_YEAR}</span>
            </div>
          </div>

          {/* GENRES */}
          <div className="filter-section">
            <h4>Genres</h4>
            <p>Select one or more genres</p>

            <div className="genre-options">
              {GENRES.map((genre) => (
                <label
                  key={genre.id}
                  className="genre-option"
                >
                  <input
                    type="checkbox"
                    checked={filters.genres.includes(genre.id)}
                    onChange={() => toggleGenre(genre.id)}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>

          {/* ACTOR */}
          <div className="filter-section">
            <label htmlFor="actor">
              Actor / Actress
            </label>

            <input
              id="actor"
              className="advanced-search-actor"
              type="text"
              placeholder="e.g. Leonardo DiCaprio"
              value={filters.actor}
              onChange={(event) =>
                updateFilter("actor", event.target.value)
              }
            />
          </div>

          {/* RATING */}
          <div className="filter-section">
            <label htmlFor="minimum-rating">
              Minimum rating: {filters.rating}/10
            </label>

            <input
              id="minimum-rating"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filters.rating}
              onChange={(event) =>
                updateFilter(
                  "rating",
                  Number(event.target.value)
                )
              }
            />
          </div>

          {/* SORT */}
          <div className="filter-section">
            <label htmlFor="movie-sort">
              Sort by
            </label>

            <select
              id="movie-sort"
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value)
              }
            >
              <option value="popularity.desc">
                Most popular
              </option>
              <option value="vote_average.desc">
                Highest rated
              </option>
              <option value="primary_release_date.desc">
                Newest first
              </option>
              <option value="primary_release_date.asc">
                Oldest first
              </option>
            </select>
          </div>

          <button
            type="button"
            className="filter-reset"
            onClick={resetFilters}
          >
            Reset Filters
          </button>

          <p className="filter-hint">
            Results update automatically.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdvancedSearch;
