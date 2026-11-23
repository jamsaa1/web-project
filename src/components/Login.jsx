
import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Kirjautuminen epäonnistui.')
        return
      }

      window.location.href = '/'

    } catch (error) {
      console.error('Kirjautumisvirhe:', error)
      alert('Palvelimeen ei saatu yhteyttä.')
    }
  }

  return (
    <div>
      <h1>Kirjaudu sisään</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="login-email">Sähköposti</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="login-password">Salasana</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">
          Kirjaudu sisään
        </button>
      </form>
    </div>
  )
}

export default Login
