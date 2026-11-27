import heroBackground from "../assets/images/hero-background.jpg";
import "./AboutUs.css";

const features = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore everything from timeless classics to hidden indie gems. Find your next favorite with movie discovery and advanced filters.",
    className: "about-feature-discover",
  },
  {
    number: "02",
    title: "Share",
    description:
      "Make your movie opinions count. Rate films, write reviews, and exchange recommendations with other film lovers.",
    className: "about-feature-share",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Meet people who share your interests. Join discussions, discover communities, and make movie nights more social.",
    className: "about-feature-connect",
  },
];

const team = [
  {
    name: "Ella",
    initials: "E",
    github: "https://github.com/kanelietana",
    linkedin: "",
  },
  {
    name: "Jami",
    initials: "J",
    github: "https://github.com/jamsaa1",
    linkedin: "",
  },
  {
    name: "Kaj",
    initials: "K",
    github: "https://github.com/natejak",
    linkedin: "https://www.linkedin.com/in/zelech/",
  },
  {
    name: "Nhi",
    initials: "N",
    github: "https://github.com/nhiiluong",
    linkedin: "",
  },
];

function AboutUs() {
  return (
    <div className="moviety-about">
      {/* HERO */}
      <header
        className="moviety-about-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(20, 20, 18, 0.82) 0%,
              rgba(20, 20, 18, 0.36) 65%,
              rgba(20, 20, 18, 0.12) 100%
            ),
            url("${heroBackground}")
          `,
        }}
      >
        <div className="moviety-about-hero-inner">
          <p className="about-eyebrow">WELCOME TO MOVIETY</p>

          <h1>
            Movies bring
            <br />
            us <em>together.</em>
          </h1>

          <p className="about-hero-description">
            Discover movies. Share opinions. Connect with people.
          </p>

          <a className="about-hero-link" href="/elokuvat">
            Explore movies
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="about-hero-index" aria-hidden="true">
          A STORY WORTH SHARING / 2026
        </div>
      </header>

      {/* INTRO */}
      <section className="about-introduction">
        <div className="about-intro-heading">
          <span className="about-section-kicker">01 / OUR STORY</span>

          <h2>
            More than
            <br />
            <span>just movies.</span>
          </h2>
        </div>

        <div className="about-intro-content">
          <span className="about-intro-asterisk" aria-hidden="true">
            ✳
          </span>

          <p>
            Welcome to our movie community, a place where film lovers come
            together to discover new favorites, share their thoughts, and
            connect through the magic of cinema.
          </p>

          <p>
            Whether you're into action-packed blockbusters, timeless classics,
            romantic comedies, or hidden indie gems, Moviety makes exploring
            movies more personal and enjoyable.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-experience">
        <div className="about-section-heading">
          <div>
            <span className="about-section-kicker">02 / THE EXPERIENCE</span>

            <h2>
              Your movie world,
              <br />
              <span>your way.</span>
            </h2>
          </div>

          <p>
            One place to explore stories, express yourself, and find your
            people.
          </p>
        </div>

        <div className="about-features">
          {features.map((feature) => (
            <article
              key={feature.number}
              className={`about-feature ${feature.className}`}
            >
              <div className="about-feature-top">
                <span>{feature.number} / 03</span>
                <span aria-hidden="true">✳</span>
              </div>

              <div className="about-feature-body">
                <h3>
                  {feature.title}
                  <span>.</span>
                </h3>
                <p>{feature.description}</p>
              </div>

              <div className="about-feature-bottom" aria-hidden="true">
                MOVIETY EXPERIENCE
                <span>↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="about-statement">
        <span className="about-section-kicker">THE IDEA BEHIND MOVIETY</span>

        <blockquote>
          Great movies are even
          <br />
          better when <em>shared.</em>
        </blockquote>

        <p>
          Our mission is simple: to bring movie enthusiasts together and make
          discovering, discussing, and enjoying films a more social experience.
        </p>

        <div className="about-statement-decoration" aria-hidden="true">
          ✳
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team-section">
        <div className="about-section-heading">
          <div>
            <span className="about-section-kicker">03 / THE PEOPLE</span>

            <h2>
              Meet the
              <br />
              <span>creators.</span>
            </h2>
          </div>

          <p>Four ICT engineering students. One shared development project.</p>
        </div>

        <div className="about-team-grid">
          {team.map((member, index) => (
            <article className="about-member" key={member.name}>
              <div className="about-member-avatar">
                <span>{member.initials}</span>
                <span className="about-member-number">0{index + 1}</span>
              </div>

              <div className="about-member-info">
                <h3>{member.name}</h3>
                <p>Development Team</p>

                <div className="about-member-socials">
                  {member.github ? (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-social-link about-social-github"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      GitHub ↗
                    </a>
                  ) : (
                    <span className="about-social-link about-social-disabled">
                      GitHub
                    </span>
                  )}

                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-social-link about-social-linkedin"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      LinkedIn ↗
                    </a>
                  ) : (
                    <span className="about-social-link about-social-disabled">
                      LinkedIn
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROJECT INFORMATION */}
      <section className="about-project-section">
        <div className="about-project-heading">
          <span className="about-section-kicker">04 / BEHIND THE PROJECT</span>

          <h2>
            Made for learning.
            <br />
            Built for movie lovers.
          </h2>
        </div>

        <div className="about-project-details">
          <div className="about-project-fact">
            <span>INSTITUTION</span>
            <strong>Oulu University of Applied Sciences</strong>
            <small className="about-programme-finnish">
              Oulun ammattikorkeakoulu
            </small>
          </div>

          <div className="about-project-fact">
            <span>PROGRAMME</span>
            <strong>ICT Engineering</strong>
            <small className="about-programme-finnish">
              Tieto- ja viestintätekniikka
            </small>
          </div>

          <div className="about-project-fact">
            <span>PROJECT</span>
            <strong>Web Application Development</strong>
            <small className="about-programme-finnish">
              Web-ohjelmoinnin sovellusprojekti
            </small>
          </div>

          <div className="about-project-fact">
            <span>YEAR</span>
            <strong>2026</strong>
          </div>
        </div>

        <p className="about-project-note">
          Moviety is developed as an educational and demonstration project by
          ICT engineering students at Oulu University of Applied Sciences
          (OAMK), Finland. The project is not intended for commercial use.
        </p>

        <p className="about-project-note">
          Movie data and images may be provided by third-party services,
          including The Movie Database (TMDB). This product uses the TMDB API
          but is not endorsed or certified by TMDB.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="about-final-cta">
        <span>YOUR NEXT FAVORITE FILM IS WAITING</span>

        <h2>
          Ready for the
          <br />
          next scene?
        </h2>

        <a href="/elokuvat">
          Discover movies
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}

export default AboutUs;
