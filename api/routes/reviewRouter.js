import { Router } from "express";

import {
  addReview,
  getMovieReviews,
  editReview,
  getRecentMovieReviews,
  getMyReviewsController,
} from "../controllers/reviewController.js";

const router = Router();

// POST /api/reviews - lisää uuden arvostelun
router.post("/", addReview);

// GET /api/reviews/recent - hakee viisi viimeisintä arvostelua
router.get("/recent", getRecentMovieReviews);

// GET /api/reviews/mine - kirjautuneen käyttäjän omat arvostelut
router.get("/mine", getMyReviewsController);

// GET /api/reviews/:tmdbId - hakee elokuvan julkiset arvostelut
router.get("/:tmdbId", getMovieReviews);

// PUT /api/reviews/:tmdbId - muokkaa omaa arvostelua
router.put("/:tmdbId", editReview);

export default router;