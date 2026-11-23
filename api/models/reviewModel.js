import { pool } from "./db.js";

// etsii elokuvan tmdb id:llä, jos ei löydy, luodaan se
export async function findOrCreateMovie(tmdbId, title, year) {
  const result = await pool.query(
    `INSERT INTO movies_db (tmdb_id, movie_name, movie_year)
     VALUES ($1, $2, $3)
     ON CONFLICT (tmdb_id)
     DO UPDATE SET
       movie_name = EXCLUDED.movie_name,
       movie_year = COALESCE(EXCLUDED.movie_year, movies_db.movie_year)
     RETURNING movie_id`,
    [tmdbId, title, year]
  );

  return result.rows[0].movie_id;
}

// luodaan uusi arvostelu
export async function createReview(
  userId,
  movieId,
  stars,
  reviewText
) {
  const result = await pool.query(
    `INSERT INTO ratings_db
      (user_id, movie_id, rating_starsnumber, rating_text)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, movieId, stars, reviewText || null]
  );

  return result.rows[0];
}

// hakee kaikki julkiset arvostelut elokuvalle
export async function getReviewsByMovie(movieId) {
  const result = await pool.query(
    `SELECT
       r.rating_id,
       r.rating_starsnumber,
       r.rating_text,
       r.rating_created_at,
       r.rating_updated_at,
       u.user_id,
       u.user_name
     FROM ratings_db r
     JOIN users_db u ON r.user_id = u.user_id
     WHERE r.movie_id = $1
       AND r.rating_visibility = 'public'
     ORDER BY r.rating_created_at DESC`,
    [movieId]
  );

  return result.rows;
}

// päivitetään olemassa oleva arvostelu
export async function updateReview(
  userId,
  movieId,
  stars,
  reviewText
) {
  const result = await pool.query(
    `UPDATE ratings_db
     SET
       rating_starsnumber = $3,
       rating_text = $4,
       rating_updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
       AND movie_id = $2
     RETURNING *`,
    [userId, movieId, stars, reviewText || null]
  );

  return result.rows[0] || null;
}

// etsii lokaalisti tallennetun elokuvan tmdb id:llä
export async function getMovieIdByTmdbId(tmdbId) {
  const result = await pool.query(
    `SELECT movie_id
     FROM movies_db
     WHERE tmdb_id = $1`,
    [tmdbId]
  );

  return result.rows[0]?.movie_id || null;
}

// viisi viimeisintä arvostelua
export async function getRecentReviews() {
  const result = await pool.query(
    `SELECT
       r.rating_id,
       r.rating_starsnumber,
       r.rating_text,
       r.rating_created_at,
       u.user_name,
       m.tmdb_id,
       m.movie_name,
       m.movie_year
     FROM ratings_db r
     JOIN users_db u ON r.user_id = u.user_id
     JOIN movies_db m ON r.movie_id = m.movie_id
     WHERE r.rating_visibility = 'public'
     ORDER BY r.rating_created_at DESC
     LIMIT 5`
  );

  return result.rows;
}
