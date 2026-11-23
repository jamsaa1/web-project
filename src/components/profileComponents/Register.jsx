import { useState } from 'react'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setSubmitted(false)

    if (!username.trim() || !email.trim() || !password) {
      setError('kentät eivät voi olla tyhjiä')
      return
    }

    if (password.length < 8) {
      setError('Salasanan pitää olla vähintään 8 merkkiä.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Rekisteröityminen epäonnistui.')
      }

      setSubmitted(true)
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '50%', margin: '50px' }}>
      <h2>Luo käyttäjä</h2>
      <p>Salasanan tulee olla vähintään 8 merkkiä.</p>

      <form onSubmit={handleSubmit} style={{ margin: '60px' }}>
        <p>Käyttäjänimi</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '50%' }}
          required
        />

        <p>Sähköposti</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '50%' }}
          required
        />

        <p>Salasana</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '50%' }}
          minLength={8}
          required
        />

        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Ladataan...' : 'Valmis'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'rgb(175, 0, 41)' }}>
          {error}
        </p>
      )}

      {submitted && (
        <div style={{ color: 'rgb(11, 126, 0)' }}>
          <p>Rekisteröityminen onnistui</p>
          <a href="/kirjaudu">Siirry kirjautumaan</a>
        </div>
      )}
    </div>
  )
}