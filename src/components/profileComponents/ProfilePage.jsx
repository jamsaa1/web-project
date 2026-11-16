import './ProfilePage.css'

export default function ProfilePage() {

    return (

        <div>
            <h1 id="Otsikko">Oma profiili</h1>

            <div className="toimintoNapit">
                <a href="/profiili/kirjaudu" className="nav-link"
                    style={{color: '#000', background: 'rgb(35, 102, 109)', width: '50%', padding: '5px', margin: '25px'}}>
                    Kirjaudu sisään
                </a>
                
                <a href="/profiili/rekisteroidy" className="nav-link"
                style={{color: '#000', background: 'rgb(35, 102, 109)', width: '50%', padding: '5px', margin: '25px'}}
                >
                    Rekisteröidy
                </a>

            </div>
        </div>

    )
}