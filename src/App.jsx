import { useEffect, useState } from "react";

import ProfilePage from "./components/profileComponents/ProfilePage";
import Register from "./components/profileComponents/Register";
import RecommendedMovies from "./components/RecommendedMovies";
import RecentReviews from "./components/RecentReviews";
import MovieDetails from "./components/MovieDetails";
import MovieSearch from "./components/MovieSearch";
import GroupHero from "./components/GroupHero";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Login from "./components/Login";
import lists from "./components/Lists";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const currentPath = window.location.pathname;

  const [user, setUser] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Kirjautumistilan tarkistus epäonnistui:", error);
        setUser(null);
      } finally {
        setCheckingLogin(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <div className="app-layout">
      <Navbar user={user} />

      <main className="app-main">
        {currentPath === "/" && (
          <>
            <Hero />

            <div className="home-layout">
              <div className="home-main">
                <RecommendedMovies />
                <br/>
                <lists />miks tää ei näy D:
              </div>

              <aside className="home-sidebar">
                <RecentReviews />
                {/* aktiiviset ryhmät tähän myöhemmin */}
              </aside>
            </div>
          </>
        )}

        {currentPath === "/elokuvat" && (
          <MovieSearch
            initialQuery={
              new URLSearchParams(window.location.search).get("query") || ""
            }
          />
        )}

        {/^\/elokuvat\/\d+$/.test(currentPath) && <MovieDetails />}

        {currentPath === "/ryhmat" && <GroupHero />}

        {currentPath === "/profiili" && !checkingLogin && (
          <ProfilePage user={user} />
        )}

        {currentPath === "/profiili/rekisteroidy" && <Register />}

        {currentPath === "/kirjaudu" &&
          !checkingLogin &&
          (user ? (
            <>
              <h2>Olet kirjautunut sisään!</h2>
              <p>Tervetuloa, {user.name}!</p>
              <Logout />
            </>
          ) : (
            <Login />
          ))}
        {currentPath === "/about-us" && <AboutUs />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
