import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./AdvancedSearch.css";

// Earliest year in cinema history.
const MIN_YEAR = 1888;

// Automatically gets the current year.
const MAX_YEAR = new Date().getFullYear();

// AdvancedSearch component allows users to filter movies
// by release year and actor.
function AdvancedSearch() {
  // Controls whether the advanced search panel is visible.
  // false = hidden, true = visible.
  const [isOpen, setIsOpen] = useState(false);

  // Stores both selected years in one array.
  // years[0] = earliest release year.
  // years[1] = latest release year.
  const [years, setYears] = useState([MIN_YEAR, MAX_YEAR]);

  // Stores the actor name entered by the user.
  const [actor, setActor] = useState("");

  return (
    <div className="advanced-search">
      {/* Button that opens or closes the advanced search panel. */}
      <button
        type="button"
        className="advanced-search-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Advanced Search
      </button>

      {/*
        Conditional rendering:
        The filters are displayed only when isOpen is true.
      */}
      {isOpen && (
        <div className="advanced-search-panel">
          {/* Title of the advanced search panel. */}
          <h3>Advanced Search</h3>

          {/* Displays the selected release year range. */}
          <label>
            Release year: {years[0]} - {years[1]}
          </label>

          {/*
            Dual range slider:
            Allows users to select the earliest
            and latest movie release year.
          */}
          <div className="year-range-container">
            <Range
              step={1}
              min={MIN_YEAR}
              max={MAX_YEAR}
              values={years}
              onChange={(values) => setYears(values)}
              // Renders the slider track and selected range.
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="year-range-track"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: years,
                      colors: ["#ccc", "#1684dd", "#ccc"],
                      min: MIN_YEAR,
                      max: MAX_YEAR,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              // Renders the two draggable slider handles.
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

          {/* Displays the minimum and maximum available years. */}
          <div className="year-range-labels">
            <span>{MIN_YEAR}</span>
            <span>{MAX_YEAR}</span>
          </div>

          {/* Displays the currently selected year range. */}
          <p className="selected-years">
            Selected years: {years[0]} - {years[1]}
          </p>

          {/* Input for searching movies by actor's name. */}
          <label htmlFor="actor">Actor:</label>

          <input
            id="actor"
            className="advanced-search-actor"
            type="text"
            placeholder="Actor name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />

          {/*
            Search functionality will be implemented later
            using the Express backend and TMDB API.
          */}
          <button type="button">Search Movies</button>
        </div>
      )}
    </div>
  );
}

// Export the component for use in App.jsx.
export default AdvancedSearch;
