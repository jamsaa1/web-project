import { useState } from 'react'

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        
        if (username.trim() === "" || password.trim() === "") {
            setError(true);
            return;
        }

        if (password.length < 8) {
            setError(true);
            return;
        }

        setError(false);
        setSubmitted(true);

        console.log(username + " " + password);
    }

    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    color: "rgb(175, 0, 41)",
                    display: error ? "" : "none",
                }}
            >
                <p>tää on aika turha "error" message koska tää lähtee tästä pois heti ku alan yhdistään tätä backendiin hyvää yötä</p>
            </div>
        );
    };

    return (

        <div style={{width: '50%', margin: '50px'}}>

            <h2>Luo käyttäjä</h2>
            <p>Salasana tulee olla vähintään 8 merkkiä</p>

            
        
            <form onSubmit={handleSubmit} style={{margin: '60px'}}>

                <p>Käyttäjänimi</p>
                <input 
                id="käyttäjänimi"
                onChange={handleUsername}
                value={username}
                style={{width: '50%'}}
                />

                <p>Salasana</p>
                <input 
                type="password"
                onChange={handlePassword}
                value={password}
                style={{width: '50%'}}
                />
                
                <br/>
                <button type="submit">Valmis</button>

            </form> 
            
            <div>{errorMessage()}</div> 

            {submitted && (
                <p style={{color: "rgb(11, 126, 0)"}}>
                    Rekisteröityminen onnistui
                </p>
            )}
        </div>

        
    )
}