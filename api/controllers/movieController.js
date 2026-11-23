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
      "https://api.themoviedb.org/3/movie/popular?language=fi-FI&page=1",
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
    const movies = await Promise.all(
      (data.results ?? []).map((movie) =>
        addEnglishFallback(movie, token)
      )
    );

    return res.json(movies);
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
 * Search movies using the TMDB API.
 * Moviety displays 15 movies per page, up to 100 pages.
 *
 * Example:
 * GET /api/movies/search?query=Batman&page=1
 */

const MOVIES_PER_PAGE = 15;
const MAX_PAGES = 100;
const TMDB_PAGE_SIZE = 20;

async function addEnglishFallback(movie, token) {
  const needsTitle = !movie.title?.trim();
  const needsOverview = !movie.overview?.trim();

  if (!needsTitle && !needsOverview) {
    return movie;
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return movie;
    }

    const englishMovie = await response.json();

    return {
      ...movie,
      title: needsTitle ? englishMovie.title || movie.title : movie.title,
      overview: needsOverview
        ? englishMovie.overview || movie.overview
        : movie.overview,
    };
  } catch (error) {
    console.error("English fallback error:", error);
    return movie;
  }
}

export async function searchMovies(req, res) {
  try {
    const query = req.query.query;
    const requestedPage = Number(req.query.page ?? 1);

    // Validate the search query.
    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    // Validate the requested page.
    if (
      !Number.isInteger(requestedPage) ||
      requestedPage < 1 ||
      requestedPage > MAX_PAGES
    ) {
      return res.status(400).json({
        error: `Page must be between 1 and ${MAX_PAGES}`,
      });
    }

    // Read the TMDB token from environment variables.
    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "TMDB API token is missing",
      });
    }

    // Calculate the global index of the first movie.
    const startIndex = (requestedPage - 1) * MOVIES_PER_PAGE;

    // Calculate which TMDB pages contain these movies.
    const firstTmdbPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;

    const lastTmdbPage =
      Math.floor((startIndex + MOVIES_PER_PAGE - 1) / TMDB_PAGE_SIZE) + 1;

    // Fetch the required TMDB pages.
    const responses = await Promise.all(
      Array.from({ length: lastTmdbPage - firstTmdbPage + 1 }, (_, index) => {
        const tmdbPage = firstTmdbPage + index;

        const url = new URL("https://api.themoviedb.org/3/search/movie");

        url.searchParams.set("query", query.trim());
        url.searchParams.set("language", "fi-FI");
        url.searchParams.set("page", String(tmdbPage));

        return fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
      })
    );

    // Check if any TMDB request failed.
    if (responses.some((response) => !response.ok)) {
      return res.status(502).json({
        error: "TMDB search request failed",
      });
    }

    // Convert the responses into JSON.
    const pages = await Promise.all(
      responses.map((response) => response.json())
    );

    // Combine the returned movie arrays.
    const allMovies = pages.flatMap((page) => page.results ?? []);

    // Calculate the position within the first TMDB page.
    const offset = startIndex % TMDB_PAGE_SIZE;

    // Select exactly 15 movies for the Moviety page.
    const movies = allMovies.slice(offset, offset + MOVIES_PER_PAGE);

    // Total results reported by TMDB.
    const totalResults = pages[0].total_results;

    // Maximum 100 pages, or fewer if there are fewer movies.
    const totalPages = Math.min(
      Math.ceil(totalResults / MOVIES_PER_PAGE),
      MAX_PAGES
    );

    // Return movie results and pagination information.
    const moviesWithFallback = await Promise.all(
      movies.map((movie) => addEnglishFallback(movie, token))
    );

    return res.json({
      results: moviesWithFallback,
      totalResults,
      totalPages,
      currentPage: requestedPage,
    });
  } catch (error) {
    console.error("TMDB search error:", error);

    return res.status(502).json({
      error: "Unable to search movies",
    });
  }
}

//Hakee yksittäisen elokuvan Tmdb:stä
export async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        error: "Invalid movie ID",
      });
    }

    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "TMDB API token is missing",
      });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=fi-FI&append_to_response=credits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status === 404 ? 404 : 502).json({
        error: "Unable to fetch movie details",
      });
    }

    const data = await response.json();
    const movie = await addEnglishFallback(data, token);

    return res.json(movie);
  } catch (error) {
    console.error("TMDB movie details error:", error);

    return res.status(502).json({
      error: "Unable to fetch movie details",
    });
  }
}

/**
 * Discover and filter movies using TMDB.
 * Returns 15 movies per Moviety page.
 */
export async function discoverMovies(req, res) {
  try {
    const token = process.env.TMDB_READ_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "TMDB API token is missing",
      });
    }

    const page = Number(req.query.page ?? 1);
    const fromYear = Number(req.query.fromYear ?? 1888);
    const toYear = Number(req.query.toYear ?? new Date().getFullYear());
    const rating = Number(req.query.rating ?? 0);
    const actor = String(req.query.actor ?? "").trim();
    const genres = String(req.query.genres ?? "").trim();
    const sort = String(req.query.sort ?? "popularity.desc");

    const allowedSort = [
      "popularity.desc",
      "vote_average.desc",
      "primary_release_date.desc",
      "primary_release_date.asc",
    ];

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > MAX_PAGES ||
      !Number.isInteger(fromYear) ||
      !Number.isInteger(toYear) ||
      fromYear < 1888 ||
      fromYear > toYear ||
      toYear > new Date().getFullYear() ||
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 10 ||
      !allowedSort.includes(sort) ||
      (genres !== "" && !/^\d+(,\d+)*$/.test(genres))
    ) {
      return res.status(400).json({
        error: "Invalid search filters",
      });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };

    // Look up the actor's TMDB ID.
    let actorId = null;

    if (actor) {
      const actorUrl = new URL("https://api.themoviedb.org/3/search/person");

      actorUrl.searchParams.set("query", actor);
      actorUrl.searchParams.set("language", "en-US");

      const actorResponse = await fetch(actorUrl, {
        headers,
      });

      if (!actorResponse.ok) {
        throw new Error("Unable to search actors");
      }

      const actorData = await actorResponse.json();

      // First matching person in TMDB.
      const matchedActor = actorData.results?.find(
        (person) => person.known_for_department === "Acting"
      );

      if (!matchedActor) {
        return res.json({
          results: [],
          totalResults: 0,
          totalPages: 0,
          currentPage: 1,
        });
      }

      actorId = matchedActor.id;
    }

    // Convert Moviety page into TMDB pages.
    const startIndex = (page - 1) * MOVIES_PER_PAGE;

    const firstTmdbPage = Math.floor(startIndex / TMDB_PAGE_SIZE) + 1;

    const lastTmdbPage =
      Math.floor((startIndex + MOVIES_PER_PAGE - 1) / TMDB_PAGE_SIZE) + 1;

    // Create a TMDB Discover URL with filters.
    function buildDiscoverUrl(tmdbPage) {
      const url = new URL("https://api.themoviedb.org/3/discover/movie");

      url.searchParams.set("language", "fi-FI");
      url.searchParams.set("page", String(tmdbPage));
      url.searchParams.set("sort_by", sort);

      // Release year range.
      url.searchParams.set("primary_release_date.gte", `${fromYear}-01-01`);

      url.searchParams.set("primary_release_date.lte", `${toYear}-12-31`);

      // Minimum rating.
      if (rating > 0) {
        url.searchParams.set("vote_average.gte", String(rating));
      }

      // Multiple genres: OR matching.
      if (genres) {
        url.searchParams.set("with_genres", genres.split(",").join("|"));
      }

      // Actor.
      if (actorId) {
        url.searchParams.set("with_cast", String(actorId));
      }

      return url;
    }

    // Fetch the necessary TMDB pages.
    const responses = await Promise.all(
      Array.from(
        {
          length: lastTmdbPage - firstTmdbPage + 1,
        },
        (_, index) =>
          fetch(buildDiscoverUrl(firstTmdbPage + index), { headers })
      )
    );

    if (responses.some((response) => !response.ok)) {
      throw new Error("TMDB discover request failed");
    }

    const pages = await Promise.all(
      responses.map((response) => response.json())
    );

    const allMovies = pages.flatMap((item) => item.results ?? []);

    const offset = startIndex % TMDB_PAGE_SIZE;

    const movies = allMovies.slice(offset, offset + MOVIES_PER_PAGE);

    const totalResults = pages[0]?.total_results ?? 0;

    const totalPages = Math.min(
      Math.ceil(totalResults / MOVIES_PER_PAGE),
      MAX_PAGES
    );

    const moviesWithFallback = await Promise.all(
      movies.map((movie) => addEnglishFallback(movie, token))
    );

    return res.json({
      results: moviesWithFallback,
      totalResults,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Discover movies error:", error);

    return res.status(502).json({
      error: "Unable to discover movies",
    });
  }
}