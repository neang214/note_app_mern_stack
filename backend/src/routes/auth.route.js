import express from 'express'
import { signUp, logIn, logOut, checkAuth } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/sign-up', signUp)
router.post('/login', logIn)
router.post('/logout', logOut)
router.get('/check', protectRoute, checkAuth)

export default router