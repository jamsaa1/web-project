import { Router } from 'express'

import {
  login,
  logout,
  getCurrentUser,
  register
} from '../controllers/authController.js'

const router = Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/me', getCurrentUser)
router.post('/register', register)

export default router
