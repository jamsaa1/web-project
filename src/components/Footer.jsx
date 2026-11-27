import "./Footer.css";

const footerSections = [
  {
    title: "Tutustu",
    links: [
      { label: "Etsi elokuvia", href: "/elokuvat" },
      { label: "Trendaavat" },
      { label: "Genret" },
      { label: "Suositukset" },
    ],
  },
  {
    title: "Omat elokuvat",
    links: [
      { label: "Katselulista" },
      { label: "Suosikit" },
      { label: "Omat arvostelut" },
      { label: "Omat listat" },
    ],
  },
  {
    title: "Yhteisö",
    links: [
      { label: "Ryhmät", href: "/ryhmat" },
      { label: "Keskustelut" },
      { label: "Jaetut listat" },
      { label: "Tapahtumat" },
    ],
  },
  {
    title: "Tili",
    links: [
      { label: "Oma profiili", href: "/profiili" },
      { label: "Asetukset" },
      { label: "Kirjaudu sisään", href: "/kirjaudu" },
    ],
  },

  {
    title: "Tuki",
    links: [
      { label: "Tietoa meistä", href: "/about-us" },
      { label: "Contact" },
      { label: "Help & FAQ" },
    ],
  },
  {
    title: "Lakiasiat",
    links: [
      { label: "Tietosuojakäytäntö" },
      { label: "Käyttöehdot" },
      {
        label: "TMDB-maininta",
        href: "https://www.themoviedb.org/",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="moviety-footer">
      <div className="moviety-footer-container">
        <nav className="moviety-footer-links" aria-label="Alatunnisteen navigaatio">
          {footerSections.map((section) => (
            <div className="moviety-footer-column" key={section.title}>
              <h3>{section.title}</h3>

              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <span className="footer-link-pending">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="moviety-footer-divider" />

        <div className="moviety-footer-bottom">
          <div className="moviety-footer-attribution">
            <img
              src="/tmdb-logo.png"
              alt="TMDB-logo"
              className="moviety-footer-tmdb-logo"
            />

            <div className="moviety-footer-attribution-text">
              <p>
                Tämä palvelu käyttää TMDB API:a, mutta TMDB ei ole hyväksynyt
                tai sertifioinut sitä.
              </p>

              <p>
                © {new Date().getFullYear()} Moviety App. Kaikki oikeudet pidätetään.
              </p>
            </div>
          </div>

          <a
            href="/"
            className="moviety-footer-brand"
            aria-label="Movietyn etusivu"
          >
            <span className="moviety-footer-brand-dark">Movie</span>
            <span className="moviety-footer-brand-gold">ty</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;