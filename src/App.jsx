import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GroupHero from './components/GroupHero'
import MovieSearch from './components/MovieSearch'
import RecommendedMovies from './components/RecommendedMovies'
import RecentReviews from './components/RecentReviews'
import './App.css'

function App() {
  const currentPath = window.location.pathname

  return (
    <>
      <Navbar />

      {currentPath === '/' && (
        <>
          <Hero />

          <main className="home-layout">
            <div className="home-main">
              <RecommendedMovies />
              {/* omat listat tähän myöhemmin */}
            </div>

            <aside className="home-sidebar">
              <RecentReviews />
              {/* aktiiviset ryhmät tähän myöhemmin */}
            </aside>
          </main>
        </>
      )}

      {currentPath === '/elokuvat' && <MovieSearch />}

      {currentPath === '/ryhmat' && <GroupHero />}
    </>
  )
}

export default App