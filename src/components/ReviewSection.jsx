import { useEffect, useState } from "react";
import "./ReviewSection.css";

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) => {
    const fill = Math.min(Math.max(rating - index, 0), 1) * 100;

    return (
      <span className="review-star" key={index}>
        <span
          className="review-star-fill"
          style={{ width: `${fill}%` }}
        >
          ★
        </span>
        <span className="review-star-empty">★</span>
      </span>
    );
  });
}

export default function ReviewSection({ movie, user }) {
  const [myReview, setMyReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const tmdbId = Number(movie.id);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(`/api/reviews/${tmdbId}`);

        if (response.ok) {
          setReviews(await response.json());
        }

        if (user) {
          const myResponse = await fetch("/api/reviews/mine", {
            credentials: "include",
          });

          if (myResponse.ok) {
            const myReviews = await myResponse.json();

            const existing = myReviews.find(
              (review) => Number(review.tmdb_id) === tmdbId
            );

            if (existing) {
              setMyReview(existing);
              setStars(String(existing.rating_starsnumber));
              setReviewText(existing.rating_text || "");
            }
          }
        }
      } catch (error) {
        console.error("Arvostelujen hakeminen epäonnistui:", error);
      }
    }

    fetchReviews();
  }, [tmdbId, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const year = movie.release_date
      ? Number(movie.release_date.slice(0, 4))
      : null;

    const body = {
      tmdbId,
      title: movie.title,
      year,
      stars: Number(stars),
      reviewText,
    };

    try {
      const response = await fetch(
        myReview ? `/api/reviews/${tmdbId}` : "/api/reviews",
        {
          method: myReview ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Arvostelun tallentaminen epäonnistui.");
        return;
      }

      setMyReview(data);
      setMessage("Arvostelu tallennettu!");

      const reviewsResponse = await fetch(`/api/reviews/${tmdbId}`);

      if (reviewsResponse.ok) {
        setReviews(await reviewsResponse.json());
      }
    } catch (error) {
      console.error("Arvostelun tallentaminen epäonnistui:", error);
      setMessage("Palvelimeen ei saatu yhteyttä.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="movie-reviews">
      <h2>Arvostelut</h2>

      {user ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>{myReview ? "Muokkaa arvosteluasi" : "Kirjoita arvostelu"}</h3>

          <label htmlFor="review-stars">Arvosana</label>
          <select
            id="review-stars"
            value={stars}
            onChange={(event) => setStars(event.target.value)}
          >
            {Array.from({ length: 10 }, (_, index) => {
              const value = (index + 1) / 2;

              return (
                <option key={value} value={value}>
                  {value.toFixed(1)} / 5
                </option>
              );
            })}
          </select>

          <label htmlFor="review-text">Arvosteluteksti</label>
          <textarea
            id="review-text"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            maxLength={5000}
            rows={4}
            placeholder="Kerro ajatuksesi elokuvasta..."
          />

          <div className="review-form-footer">
            <span>{reviewText.length}/5000 merkkiä</span>

            <button type="submit" disabled={loading}>
              {loading
                ? "Tallennetaan..."
                : myReview
                  ? "Tallenna muutokset"
                  : "Lähetä arvostelu"}
            </button>
          </div>

          {message && <p className="review-form-message">{message}</p>}
        </form>
      ) : (
        <div className="review-login-prompt">
          <p>Kirjaudu sisään, jos haluat arvostella tämän elokuvan.</p>
          <a href="/kirjaudu">Kirjaudu sisään →</a>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="reviews-empty">
            Tästä elokuvasta ei ole vielä arvosteluja.
          </p>
        ) : (
          reviews.map((review) => (
            <article className="movie-review-card" key={review.rating_id}>
              <div className="movie-review-header">
                <div>
                  <h3>{review.user_name}</h3>
                  <span className="movie-review-date">
                    {new Date(review.rating_created_at).toLocaleDateString("fi-FI")}
                  </span>
                </div>

                <div className="movie-review-rating">
                  <div>{renderStars(Number(review.rating_starsnumber))}</div>
                  <span>{Number(review.rating_starsnumber).toFixed(1)}/5</span>
                </div>
              </div>

              {review.rating_text && (
                <p className="movie-review-text">{review.rating_text}</p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}