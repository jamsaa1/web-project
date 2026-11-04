/**
 * Fetches a list of popular movies from The Movie Database (TMDB) API.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export async function getPopularMovies(req, res) {
  try {
    // Retrieve the TMDB API token from environment variables.
    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    // Check whether the API token has been configured.
    // Return HTTP 500 if the token is missing.
    if (!token) {
      return res.status(500).json({
        error: "TMDB API token is missing",
      });
    }

    // Send a GET request to the TMDB API to retrieve popular movies.
    // The results are requested in English, from the first page.
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          // Authenticate the request using the TMDB Bearer token.
          Authorization: `Bearer ${token}`,

          // Tell TMDB that we expect a JSON response.
          accept: "application/json",
        },
      }
    );

    // Check if TMDB returned an unsuccessful HTTP response.
    // Return HTTP 502 because the external API request failed.
    if (!response.ok) {
      return res.status(502).json({
        error: `TMDB API returned status ${response.status}`,
      });
    }

    // Convert the JSON response into a JavaScript object.
    const data = await response.json();

    // Send the array of popular movies back to the frontend.
    // Express automatically converts it into JSON.
    return res.json(data.results);
  } catch (error) {
    // Handle network errors or unexpected failures.
    // Log the error on the backend for debugging.
    console.error("TMDB API error:", error);

    // Return HTTP 502 to inform the frontend that
    // the movie data could not be retrieved.
    return res.status(502).json({
      error: "Unable to fetch movies from TMDB",
    });
  }
}

/**
 * Search for movies by title using the TMDB API.
 * Example: GET /api/movies/search?query=Batman
 */
export async function searchMovies(req, res) {
  try {
    // Get the search text from the URL query parameters.
    const query = req.query.query;

    // Check if the search query is empty.
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    // Read the TMDB API token from environment variables.
    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "TMDB API token is missing",
      });
    }

    // Build the TMDB search URL.
    const url = new URL("https://api.themoviedb.org/3/search/movie");

    // Add the movie title and language to the request.
    url.searchParams.set("query", query.trim());
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    // Send the request to TMDB.
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    // Handle unsuccessful responses from TMDB.
    if (!response.ok) {
      return res.status(502).json({
        error: "TMDB search request failed",
      });
    }

    // Convert the response to a JavaScript object.
    const data = await response.json();

    // Return the matching movies to the frontend.
    return res.json(data.results);
  } catch (error) {
    // Log unexpected errors.
    console.error("TMDB search error:", error);

    return res.status(502).json({
      error: "Unable to search movies",
    });
  }
}
