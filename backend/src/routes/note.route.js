import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getNote, createNote, updateNote, deleteNote } from '../controllers/note.controller.js'

const router = express.Router()

router.get('/note', protectRoute, getNote)
router.post('/create/note/', protectRoute, createNote)
router.put('/note/:id', protectRoute, updateNote)
router.delete('/note/:id', protectRoute, deleteNote)

export default router