import express, { json } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import noteToutes from './routes/note.route.js'
import { app, server } from './lib/socket.js'

dotenv.config()
const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api', noteToutes)

server.listen(PORT, () => {
    console.log(`server running on PORT:${PORT}`)
    connectDB()
})