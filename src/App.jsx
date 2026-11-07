import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieSearch from './components/MovieSearch'
import './App.css'

function App() {
  const currentPath = window.location.pathname

  return (
    <>
      <Navbar />

      {currentPath === '/' && <Hero />}

      {currentPath === '/elokuvat' && <MovieSearch />}

      {currentPath === '/ryhmat' && <h1>Ryhmät</h1>}
    </>
  )
}

export default App