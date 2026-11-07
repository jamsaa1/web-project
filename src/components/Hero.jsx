import heroBackground from '../assets/images/hero-background.jpg'
import arrowIcon from '../assets/icons/arrow-right.svg'
import peopleIcon from '../assets/icons/people.svg'

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="hero-content">
        <h1>Moviety</h1>

        <h2>Yhteisö elokuvien ystäville.</h2>

        <p>
          Arvostele elokuvia, liity ryhmiin sekä
          rakenna omia elokuvalistoja muiden
          elokuvafanien kanssa.
        </p>
      </div>

      <div className="hero-buttons">
        <button className="hero-button primary">
          Selaa elokuvia
          <img src={arrowIcon} alt="" />
        </button>

        <button className="hero-button secondary">
          Liity ryhmiin
          <img src={peopleIcon} alt="" />
        </button>
      </div>
    </section>
  )
}

export default Hero