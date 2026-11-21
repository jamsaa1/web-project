
import argon2 from 'argon2'
import { pool } from '../models/db.js'

function publicUser(user) {
  return {
    id: user.user_id,
    name: user.user_name,
    email: user.user_email
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Sähköposti ja salasana vaaditaan.'
      })
    }

    const result = await pool.query(
      `SELECT user_id, user_name, user_email,
              user_passwordhash, user_isactive
       FROM users_db
       WHERE LOWER(user_email) = LOWER($1)`,
      [email.trim()]
    )

    const user = result.rows[0]


const validPassword = user
  ? await argon2.verify(user.user_passwordhash, password)
  : false

if (!user || !user.user_isactive || !validPassword) {
  return res.status(401).json({
    message: 'Virheellinen sähköposti tai salasana.'
  })
}

    req.session.regenerate((error) => {
      if (error) return next(error)

      req.session.userId = user.user_id

      req.session.save((saveError) => {
        if (saveError) return next(saveError)

        res.json({
          message: 'Kirjautuminen onnistui.',
          user: publicUser(user)
        })
      })
    })


  } catch (error) {
    next(error)
  }
}

export function logout(req, res, next) {
  req.session.destroy((error) => {
    if (error) return next(error)

    res.clearCookie('moviety.sid', {
      path: '/'
    })

    res.json({
      message: 'Uloskirjautuminen onnistui.'
    })
  })
}

export async function getCurrentUser(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: 'Et ole kirjautunut sisään.'
      })
    }

    const result = await pool.query(
      `SELECT user_id, user_name, user_email
       FROM users_db
       WHERE user_id = $1 AND user_isactive = TRUE`,
      [req.session.userId]
    )

    if (!result.rows[0]) {
      return res.status(401).json({
        message: 'Käyttäjää ei löytynyt.'
      })
    }

    res.json({
      user: publicUser(result.rows[0])
    })

  } catch (error) {
    next(error)
  }
}
