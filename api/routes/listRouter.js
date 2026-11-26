import { Router } from "express";

import { searchMovies } from '../controllers/movieController.js';

import { createList, addMovieToList, findList, editList, removeList, removeListItem } from '../controllers/listController.js';

const router = Router();

router.post("/", createList);

router.get("/:id", findList);

router.put("/:id", editList);

router.delete("/:id", removeList);

router.post("/:id/movies", addMovieToList);

router.delete("/:id/movies/:movieId", removeListItem);

router.get("/search", searchMovies);

export default router;

