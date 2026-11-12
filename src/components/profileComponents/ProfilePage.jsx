import './ProfilePage.css'

export default function ProfilePage() {

    return (

        <div>
            <h1 id="Otsikko">Oma profiili</h1>

            <div className="toimintoNapit">
                <button onClick={() => console.log("kirjaudu sisään")}>Kirjaudu sisään</button>
                {/* <button onClick={() => console.log("rekisteröidy")}
                >Rekisteröidy</button> */}

                <a href="/profiili/rekisteroidy" className="nav-link">
                    Rekisteröidy
                </a>

            </div>
        </div>

    )
}