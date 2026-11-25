import { Router } from "express";

import { searchMovies } from '../controllers/movieController';

import { createList, getList, updateList, deleteList, addListItem, deleteListItem } from '../controllers/listController';

const router = Router();

router.post("/", createList);

router.get("/:id", getList);

router.put("/:id", updateList);

router.delete("/:id", deleteList);

router.post("/:id/movies", addListItem);

router.delete("/:id/movies/:movieId", deleteListItem);

router.get("/search", searchMovies);

export default router;

