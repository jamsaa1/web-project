import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  //haetaan elokuvan tiedot
  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error("Virhe haussa:", err));
  }, [id]);

  //haun käynnistys
  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      try {
        const response = await fetch(`/api/movies/search?query=${encodeURIComponent(searchQuery.trim())}`);
        const data = await response.json();

        const moviesList = Array.isArray(data) ? data : data.results;

        if (moviesList && moviesList.length > 0) {
          const firstMovieId = moviesList[0].id;
          navigate(`/movies/${firstMovieId}`);
          setSearchQuery(''); // tyhjennetään hakukenttä
        } else {
          alert("Elokuvaa ei löytynyt tällä nimellä.");
        }
      } catch (err) {
        console.error("Virhe elokuvan haussa:", err);
      }
    }
  };

  if (!movie) return <div style={{ color: '#fff1d6', padding: '20px' }}>Ladataan tietoja...</div>;

  return (
    <div style={{ backgroundColor: '#23666d', minHeight: '100vh', color: '#fff1d6', fontFamily: 'sans-serif' }}>
      
      {/* yläpalkki */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#1b5156' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <h2 style={{ color: '#ac7435', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>Moviety</h2>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🏠 Koti</span>
          <span style={{ cursor: 'pointer' }}>💬 Ryhmät</span>
          <span style={{ cursor: 'pointer' }}>🎬 Elokuvat</span>
        </div>

        {/* nimihakukenttä */}
        <div>
          <input 
            type="text"
            placeholder="Hae elokuvan nimellä"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{ 
              background: '#2e7d84', 
              border: 'none',
              outline: 'none',
              padding: '8px 15px', 
              borderRadius: '20px', 
              color: '#fff', 
              width: '250px',
              fontSize: '14px'
            }}
          />
        </div>
      </nav>

      {/* kansikuva */}
      <div style={{ 
        position: 'relative', 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 40px',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>{movie.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#ac7435', fontSize: '20px' }}>⭐⭐⭐⭐⭐</span>
              <span>{movie.runtime ? `${movie.runtime} min` : 'Elokuvan kesto'}</span>
            </div>
          </div>
          <h1 style={{ fontSize: '48px', margin: 0, opacity: 0.8 }}>
            ({movie.release_date ? movie.release_date.substring(0, 4) : '1234'})
          </h1>
        </div>
      </div>

      {/* kuvauslaatikko */}
      <div style={{ backgroundColor: '#fff1d6', color: '#251f18', padding: '40px', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', gap: '60px' }}>
          {/* Vasen puoli: Tiedot */}
          <div style={{ flex: 1, fontSize: '20px', lineHeight: '2.2' }}>
            <p><strong>Ohjaaja:</strong> ohjaajan nimi</p>
            <p><strong>Käsikirjoittaja:</strong> nimi</p>
            <p><strong>Tuottaja:</strong> nimi</p>
            <br />
            <p><strong>Genre:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
          </div>

          {/* oikea puolen kuvauslaatikko */}
          <div style={{ flex: 1, backgroundColor: '#d8cbaf', padding: '25px', borderRadius: '12px', minHeight: '250px' }}>
            <h3 style={{ marginTop: 0 }}>Kuvaus:</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{movie.overview}</p>
          </div>
        </div>

        {/* takaisin nappi */}
        <div>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              backgroundColor: '#ac7435', 
              color: '#fff', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            ← Takaisin
          </button>
        </div>

      </div>
    </div>
  );
}