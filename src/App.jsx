
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GroupHero from './components/GroupHero'
import MovieSearch from './components/MovieSearch'
import RecommendedMovies from './components/RecommendedMovies'
import ProfilePage from './components/profileComponents/ProfilePage'
import Register from './components/profileComponents/Register'
import Login from './components/profileComponents/Login'
import Logout from './components/profileComponents/Logout'
import MovieDetails from './components/MovieDetails'
import './App.css'

function App() {
  const currentPath = window.location.pathname

  const [user, setUser] = useState(null)
  const [checkingLogin, setCheckingLogin] = useState(true)

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Kirjautumistilan tarkistus epäonnistui:', error)
        setUser(null)
      } finally {
        setCheckingLogin(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <>
      <Navbar user={user} />

      {currentPath === '/' && (
        <>
          <Hero />
          <RecommendedMovies />
        </>
      )}

      {currentPath === '/elokuvat' && <MovieSearch />}

      {/^\/elokuvat\/\d+$/.test(currentPath) && <MovieDetails />}

      {currentPath === '/ryhmat' && (
        <GroupHero />
      )}

      {currentPath === '/profiili' && !checkingLogin && (
      <ProfilePage user={user} />
         )}

      {currentPath === '/profiili/rekisteroidy' && <Register />}

      {currentPath === '/kirjaudu' && (
        <>
          {!checkingLogin && (
            user ? (
              <>
                <h2>Olet kirjautunut sisään!</h2>
                <p>Tervetuloa, {user.name}!</p>
                <Logout />
              </>
            ) : (
              <Login />
            )
          )}
        </>
      )}
    </>
  )
}

export default App
