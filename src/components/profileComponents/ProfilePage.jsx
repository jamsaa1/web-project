
import Logout from '../Logout'
import './ProfilePage.css'

export default function ProfilePage({ user }) {
  return (
    <div>
      <h1 id="Otsikko">Oma profiili</h1>

      <div className="toimintoNapit">
        {user ? (
          <>
            <p>Tervetuloa, {user.name}!</p>
            <Logout />
          </>
        ) : (
          <>
            <a
              href="/kirjaudu"
              className="nav-link"
              style={{
                color: '#000',
                background: 'rgb(35, 102, 109)',
                width: '50%',
                padding: '5px',
                margin: '25px'
              }}
            >
              Kirjaudu sisään
            </a>

            <a
              href="/profiili/rekisteroidy"
              className="nav-link"
              style={{
                color: '#000',
                background: 'rgb(35, 102, 109)',
                width: '50%',
                padding: '5px',
                margin: '25px'
              }}
            >
              Rekisteröidy
            </a>
          </>
        )}
      </div>
    </div>
  )
}
