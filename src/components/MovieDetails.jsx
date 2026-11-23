
import React, { useEffect, useState } from "react";

export default function MovieDetails() {

  const id = window.location.pathname.split("/")[2];

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Haetaan elokuvan tiedot backendin kautta TMDB:stä.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const response = await fetch(`/api/movies/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Elokuvan tietoja ei voitu hakea.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Virhe elokuvan haussa:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => controller.abort();
  }, [id]);

  // Näytetään lataus- tai virheilmoitus.
  if (loading) {
    return (
      <div style={{ padding: "30px", color: "#251f18" }}>
        Ladataan elokuvan tietoja...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px", color: "#251f18" }}>
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ padding: "30px", color: "#251f18" }}>
        Elokuvaa ei löytynyt.
      </div>
    );
  }

  // Haetaan elokuvan tekijät TMDB
  const crew = movie.credits?.crew || [];

  const director = crew
    .filter((person) => person.job === "Director")
    .map((person) => person.name)
    .join(", ");

  const writers = [
    ...new Set(
      crew
        .filter((person) =>
          ["Writer", "Screenplay", "Story"].includes(person.job)
        )
        .map((person) => person.name)
    ),
  ].join(", ");

  const producers = crew
    .filter((person) => person.job === "Producer")
    .map((person) => person.name)
    .join(", ");

  // Elokuvan genret
  const genres = movie.genres
    ?.map((genre) => genre.name)
    .join(", ");

  // Muutetaan elokuvan kesto tunneiksi ja minuuteiksi.
  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;

  // TMDB:n antama arvosana.
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : null;

  return (
    <div
      style={{
        backgroundColor: "#23666d",
        minHeight: "100vh",
        color: "#fff1d6",
        fontFamily: "sans-serif",
      }}
    >
      {/* Kansikuva ja elokuvan perustiedot */}
      <div
        style={{
          position: "relative",
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
          backgroundColor: "#1b5156",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 40px",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "48px",
                margin: "0 0 10px 0",
              }}
            >
              {movie.title}
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  color: "#ac7435",
                  fontSize: "20px",
                }}
              >
                ⭐ {rating !== null ? `${rating}/10` : "Ei arvosanaa"}
              </span>

              <span>
                {movie.runtime
                  ? `${hours} h ${minutes} min`
                  : "Kesto ei tiedossa"}
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "48px",
              margin: 0,
              opacity: 0.8,
            }}
          >
            {movie.release_date?.slice(0, 4) || "–"}
          </h1>
        </div>
      </div>

      {/* Elokuvan tarkemmat tiedot */}
      <div
        style={{
          backgroundColor: "#fff1d6",
          color: "#251f18",
          padding: "40px",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* Vasen puoli: elokuvan tekijät ja genret */}
          <div
            style={{
              flex: "1 1 280px",
              fontSize: "20px",
              lineHeight: "2.2",
            }}
          >
            <p>
              <strong>Ohjaaja:</strong> {director || "Ei tiedossa"}
            </p>

            <p>
              <strong>Käsikirjoittaja:</strong> {writers || "Ei tiedossa"}
            </p>

            <p>
              <strong>Tuottaja:</strong> {producers || "Ei tiedossa"}
            </p>

            <br />

            <p>
              <strong>Genre:</strong> {genres || "Ei tiedossa"}
            </p>
          </div>

          {/* Oikea puoli: elokuvan kuvaus */}
          <div
            style={{
              flex: "1 1 280px",
              backgroundColor: "#d8cbaf",
              padding: "25px",
              borderRadius: "12px",
              minHeight: "250px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Kuvaus:</h3>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            >
              {movie.overview || "Elokuvalla ei ole kuvausta."}
            </p>
          </div>
        </div>

        {/* Takaisin-painike */}
        <div>
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: "#ac7435",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ← Takaisin
          </button>
        </div>
      </div>
    </div>
  );
}
