
function Logout() {
  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        alert('Uloskirjautuminen epäonnistui.')
        return
      }

      window.location.href = '/kirjaudu'

    } catch (error) {
      console.error('Uloskirjautumisvirhe:', error)
      alert('Palvelimeen ei saatu yhteyttä.')
    }
  }

  return (
    <button type="button" onClick={handleLogout}>
      Kirjaudu ulos
    </button>
  )
}

export default Logout
