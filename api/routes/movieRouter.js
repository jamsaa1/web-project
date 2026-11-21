import { Router } from "express";

import {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} from "../controllers/movieController.js";

const router = Router();

// GET /api/movies/popular
// Returns popular movies from TMDB.
router.get("/popular", getPopularMovies);

// GET /api/movies/search?query=Batman
// Searches movies by title.
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

export default router;
