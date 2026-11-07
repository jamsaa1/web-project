import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GroupHero from './components/GroupHero'
import MovieSearch from './components/MovieSearch'
import RecommendedMovies from './components/RecommendedMovies'
import './App.css'

function App() {
  const currentPath = window.location.pathname

  return (
    <>
      <Navbar />

      {currentPath === '/' && (
        <>
          <Hero />
          <RecommendedMovies />
        </>
      )}

      {currentPath === '/elokuvat' && <MovieSearch />}

      {currentPath === '/ryhmat' && (
        <>
          <GroupHero />
        </>
      )}
    </>
  )
}

export default App