
import { useEffect, useRef, useState } from 'react'
import './GroupChat.css'

function GroupChat({ groupId, currentUserId }) {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const messagesContainerRef = useRef(null)
  const shouldScrollRef = useRef(true)

  // Haetaan viestit ja tarkistetaan uudet 5 sekunnin välein
  useEffect(() => {
    let cancelled = false
    let requestInProgress = false

    async function fetchMessages() {
      if (requestInProgress) return

      requestInProgress = true

      try {
        const response = await fetch(`/api/groups/${groupId}/messages`, {
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Viestien hakeminen epäonnistui')
        }

        const data = await response.json()

        if (!cancelled) {
          setMessages((previousMessages) => {
            const oldIds = previousMessages.map((message) => message.message_id)
            const newIds = data.map((message) => message.message_id)

            if (
              oldIds.length === newIds.length &&
              oldIds.every((id, index) => id === newIds[index])
            ) {
              return previousMessages
            }

            return data
          })

          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        requestInProgress = false

        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    setMessages([])
    setLoading(true)
    setError('')
    shouldScrollRef.current = true

    if (groupId) {
      fetchMessages()

      const intervalId = setInterval(fetchMessages, 5000)

      return () => {
        cancelled = true
        clearInterval(intervalId)
      }
    }

    setLoading(false)

    return () => {
      cancelled = true
    }
  }, [groupId])

  // Vieritetään alas, jos käyttäjä on lähellä loppua
  useEffect(() => {
    const container = messagesContainerRef.current

    if (container && shouldScrollRef.current) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  function handleScroll() {
    const container = messagesContainerRef.current

    if (!container) return

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight

    shouldScrollRef.current = distanceFromBottom < 80
  }

  async function handleSendMessage(event) {
    event.preventDefault()

    if (!messageText.trim() || sending || !groupId) return

    try {
      setSending(true)
      setError('')

      const response = await fetch(`/api/groups/${groupId}/messages`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messageText: messageText.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Viestin lähettäminen epäonnistui')
      }

      const newMessage = await response.json()

      shouldScrollRef.current = true

      setMessages((previousMessages) => {
        if (
          previousMessages.some(
            (message) => message.message_id === newMessage.message_id
          )
        ) {
          return previousMessages
        }

        return [...previousMessages, newMessage]
      })

      setMessageText('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('fi-FI', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="group-chat">
      <h2>Ryhmän keskustelu</h2>

      {error && <p role="alert">{error}</p>}

      <div
        className="chat-messages"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {loading && <p>Ladataan viestejä...</p>}

        {!loading && messages.length === 0 && !error && (
          <p>Ei vielä viestejä. Aloita keskustelu!</p>
        )}

        {messages.map((message) => {
          const isOwnMessage =
            currentUserId != null &&
            Number(message.user_id) === Number(currentUserId)

          return (
            <div
              className={`chat-message ${isOwnMessage ? 'own-message' : 'other-message'}`}
              key={message.message_id}
            >
              <strong>{isOwnMessage ? 'Sinä' : message.user_name}</strong>
              <p>{message.message_text}</p>
              <span className="chat-time">
                {formatTime(message.created_at)}
              </span>
            </div>
          )
        })}
      </div>

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="Kirjoita viesti..."
          aria-label="Kirjoita viesti"
          maxLength={2000}
          disabled={sending || loading || !groupId}
        />

        <button
          type="submit"
          disabled={sending || loading || !messageText.trim() || !groupId}
        >
          {sending ? 'Lähetetään...' : 'Lähetä'}
        </button>
      </form>
    </section>
  )
}

export default GroupChat
