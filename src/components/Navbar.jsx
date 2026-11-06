import houseIcon from '../assets/icons/house-door.svg'
import chatIcon from '../assets/icons/chat-left.svg'
import filmIcon from '../assets/icons/film.svg'
import searchIcon from '../assets/icons/search.svg'
import gearIcon from '../assets/icons/gear.svg'
import personIcon from '../assets/icons/person-circle.svg'

function Navbar() {
  return (
    <nav className="navbar">

      {/* Moviety logo */}
      <div className="navbar-logo">
        <span className="logo-main">Movie</span>
        <span className="logo-accent">ty</span>
      </div>

      {/* Navigation linkit */}
      <div className="navbar-links">
        <a href="/" className="nav-link active">
          <img src={houseIcon} alt="" />
          Koti
        </a>

        <a href="/ryhmat" className="nav-link">
          <img src={chatIcon} alt="" />
          Ryhmät
        </a>

        <a href="/elokuvat" className="nav-link">
        <img src={filmIcon} alt="" />
          Elokuvat
        </a>
      </div>

      {/* Search bar | TODO */}
      <div className="navbar-search">
        <img src={searchIcon} alt="" />

        <input
          type="text"
          placeholder="Hae elokuvia tai ryhmiä..."
        />
      </div>

      {/* Asetukset ja profiili | TODO */}
      <div className="navbar-actions">
        <button aria-label="Asetukset">
          <img src={gearIcon} alt="" />
        </button>

        <button aria-label="Käyttäjäprofiili">
          <img src={personIcon} alt="" />
        </button>
      </div>

    </nav>
  )
}

export default Navbar