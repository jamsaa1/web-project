import {
  findOrCreateMovie,
  getMovieIdByTmdbId,
  createReview,
  getReviewsByMovie,
  updateReview,
  getRecentReviews,
} from "../models/reviewModel.js";

// arvostelun tarkistus
function isValidRating(stars) {
  return (
    typeof stars === "number" &&
    stars >= 0.5 &&
    stars <= 5 &&
    Number.isInteger(stars * 2)
  );
}

// POST: luodaan uusi arvostelu
export async function addReview(req, res) {
  try {
    const { tmdbId, title, year, stars, reviewText } = req.body;

    if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
      return res.status(400).json({ error: "Virheellinen elokuvatunniste" });
    }

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Elokuvan nimi puuttuu" });
    }

    if (!isValidRating(stars)) {
      return res.status(400).json({
        error: "Arvosanan tulee olla 0,5 - 5 tähteä",
      });
    }

    if (
      reviewText !== undefined &&
      reviewText !== null &&
      typeof reviewText !== "string"
    ) {
      return res.status(400).json({ error: "Arvosteluteksti ei ole kelvollinen" });
    }

    if (typeof reviewText === "string" && reviewText.length > 5000) {
      return res.status(400).json({ error: "Arvosteluteksti on liian pitkä" });
    }

    if (!req.session.userId) {
      return res.status(401).json({
        error: "Kirjaudu sisään arvostellaksesi elokuvan",
      });
    }

    const movieId = await findOrCreateMovie(
      tmdbId,
      title.trim(),
      Number.isInteger(year) ? year : null
    );

    const review = await createReview(
      req.session.userId,
      movieId,
      stars,
      reviewText?.trim() || null
    );

    return res.status(201).json(review);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "Olet jo arvostellut tämän elokuvan",
      });
    }

    console.error("Add review error:", error);
    return res.status(500).json({ error: "Arvostelun tallentaminen epäonnistui" });
  }
}

// GET: haetaan elokuvan julkiset arvostelut
export async function getMovieReviews(req, res) {
  try {
    const tmdbId = Number(req.params.tmdbId);

    if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
      return res.status(400).json({ error: "Virheellinen elokuvatunniste" });
    }

    const movieId = await getMovieIdByTmdbId(tmdbId);

    if (!movieId) {
      return res.json([]);
    }

    const reviews = await getReviewsByMovie(movieId);

    return res.json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    return res.status(500).json({ error: "Arvostelujen hakeminen epäonnistui" });
  }
}

// PUT: päivitetään käyttäjän arvostelu
export async function editReview(req, res) {
  try {
    const tmdbId = Number(req.params.tmdbId);
    const { stars, reviewText } = req.body;

    if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
      return res.status(400).json({ error: "Virheellinen elokuvatunniste" });
    }

    if (!isValidRating(stars)) {
      return res.status(400).json({
        error: "Arvosanan tulee olla 0,5 - 5 tähteä",
      });
    }

    if (
      reviewText !== undefined &&
      reviewText !== null &&
      typeof reviewText !== "string"
    ) {
      return res.status(400).json({ error: "Arvosteluteksti ei ole kelvollinen" });
    }

    if (typeof reviewText === "string" && reviewText.length > 5000) {
      return res.status(400).json({ error: "Arvosteluteksti on liian pitkä" });
    }

    if (!req.session.userId) {
      return res.status(401).json({
        error: "Kirjaudu sisään muokataksesi arvostelua",
      });
    }

    const movieId = await getMovieIdByTmdbId(tmdbId);

    if (!movieId) {
      return res.status(404).json({ error: "Elokuvaa ei löytynyt" });
    }

    const review = await updateReview(
      req.session.userId,
      movieId,
      stars,
      reviewText?.trim() || null
    );

    if (!review) {
      return res.status(404).json({ error: "Arvostelua ei löytynyt" });
    }

    return res.json(review);
  } catch (error) {
    console.error("Update review error:", error);
    return res.status(500).json({ error: "Arvostelun päivittäminen epäonnistui" });
  }
}

export async function getRecentMovieReviews(req, res) {
  try {
    const reviews = await getRecentReviews();
    return res.json(reviews);
  } catch (error) {
    console.error("Get recent reviews error:", error);

    return res.status(500).json({
      error: "Viimeisimpien arvostelujen hakeminen epäonnistui",
    });
  }
}