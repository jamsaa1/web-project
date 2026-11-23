import "./Footer.css";

const footerSections = [
  {
    title: "Discover",
    links: [
      { label: "Search Movies", href: "/elokuvat" },
      { label: "Trending" },
      { label: "Genres" },
      { label: "Recommendations" },
    ],
  },
  {
    title: "My Movies",
    links: [
      { label: "Watchlist" },
      { label: "Favorites" },
      { label: "My Reviews" },
      { label: "My Lists" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Groups", href: "/ryhmat" },
      { label: "Discussions" },
      { label: "Shared Lists" },
      { label: "Events" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", href: "/profiili" },
      { label: "Settings" },
      { label: "Log In", href: "/kirjaudu" },
    ],
  },

  {
    title: "Support",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact" },
      { label: "Help & FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
      {
        label: "TMDB Attribution",
        href: "https://www.themoviedb.org/",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="moviety-footer">
      <div className="moviety-footer-container">
        <nav className="moviety-footer-links" aria-label="Footer navigation">
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
              alt="TMDB logo"
              className="moviety-footer-tmdb-logo"
            />

            <div className="moviety-footer-attribution-text">
              <p>
                This service uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>

              <p>
                © {new Date().getFullYear()} Moviety App. All rights reserved.
              </p>
            </div>
          </div>

          <a
            href="/"
            className="moviety-footer-brand"
            aria-label="Moviety home"
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
