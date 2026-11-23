import { Router } from "express";

import {
  getPopularMovies,
  searchMovies,
  discoverMovies,
  getMovieDetails,
} from "../controllers/movieController.js";

const router = Router();

// GET /api/movies/popular
// Returns popular movies from TMDB.
router.get("/popular", getPopularMovies);

// GET /api/movies/search?query=Batman
// Searches movies by title.
router.get("/search", searchMovies);

// GET /api/movies/discover
// Returns movies without requiring a search title.
// Later supports advanced filters.
router.get("/discover", discoverMovies);

// GET /api/movies/12345
// Returns details of a specific movie.
router.get("/:id", getMovieDetails);

export default router;
