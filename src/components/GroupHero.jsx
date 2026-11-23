import groupHeroBackground from '../assets/images/groups-hero.jpg'
import './GroupHero.css'

function GroupHero() {
  return (
    <section
      className="group-hero"
      style={{ backgroundImage: `url(${groupHeroBackground})` }}
    >
      <div className="group-hero-content">
        <h1>Ryhmät</h1>

        <p>
          Löydä omaan makuun sopivia ryhmiä,
          <br />
          keskustele sekä jaa suosituksia.
        </p>
      </div>
    </section>
  )
}

export default GroupHero