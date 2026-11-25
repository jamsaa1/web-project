import { pool } from './db.js'

export async function addList(
  list_id,
  movieId,
  stars,
  reviewText
) {
  const result = await pool.query(
    `INSERT INTO ratings_db
      (user_id, movie_id, rating_starsnumber, rating_text)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [list_id, movieId, stars, reviewText || null]
  );

  return result.rows[0];
};

export async function addListItem() {};

export async function getList() {};

export async function updateList() {};

export async function deleteList() {};

