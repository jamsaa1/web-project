import houseIcon from '../assets/icons/house-door.svg'
import chatIcon from '../assets/icons/chat-left.svg'
import filmIcon from '../assets/icons/film.svg'
import searchIcon from '../assets/icons/search.svg'
import gearIcon from '../assets/icons/gear.svg'
import personIcon from '../assets/icons/person-circle.svg'

import { useState } from 'react'



function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearch(event) {
    event.preventDefault()

    const query = searchQuery.trim()

    if (!query) return

    window.location.href = `/elokuvat?query=${encodeURIComponent(query)}`
  }

  const currentPath = window.location.pathname  

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

      {/* Search bar */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <img src={searchIcon} alt="" />

        <input
          type="text"
          placeholder="Hae elokuvia tai ryhmiä..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </form>

      {/* Asetukset ja profiili | TODO */}
      <div className="navbar-actions">
        <button aria-label="Asetukset">
          <img src={gearIcon} alt="" />
        </button>

        {/* <button 
          aria-label="Käyttäjäprofiili"
          onClick={ () => currentPath = '/profiili'}
        >
          <img src={personIcon} alt="" />
        </button> */} 

        <a 
          href="/profiili" className="nav-link">
          <img src={personIcon} alt="" />
        </a>

      </div>

    </nav>
  )
}

export default Navbar
