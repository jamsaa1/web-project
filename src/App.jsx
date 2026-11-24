import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GroupHero from './components/GroupHero'
import GroupChat from './components/GroupChat'
import MovieSearch from './components/MovieSearch'
import AdvancedSearch from './components/AdvancedSearch'
import RecommendedMovies from './components/RecommendedMovies'
import RecentReviews from './components/RecentReviews'
import ProfilePage from './components/profileComponents/ProfilePage'
import Register from './components/profileComponents/Register'
import Login from './components/Login'
import Logout from './components/Logout'
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
          credentials: 'include',
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

      {currentPath === '/elokuvat' && (
        <>
          <MovieSearch />
          <AdvancedSearch />
        </>
      )}

      {/^\/elokuvat\/\d+$/.test(currentPath) && <MovieDetails />}

      {currentPath === '/ryhmat' && (
       <>
      <GroupHero />
      <GroupChat groupId={1} currentUserId={user?.id} />
      </>
      )}

      {currentPath === '/profiili' && !checkingLogin && (
        <ProfilePage user={user} />
      )}

      {currentPath === '/profiili/rekisteroidy' && <Register />}

      {currentPath === '/kirjaudu' && !checkingLogin && (
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
  )
}

export default App