import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

function App() {
  const currentPath = window.location.pathname

  return (
    <>
      <Navbar />

      {currentPath === '/' && <Hero />}
    </>
  )
}

export default App