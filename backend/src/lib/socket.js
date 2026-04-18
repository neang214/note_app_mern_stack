import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("connect user " + socket.id)
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    socket.on('disconnect', () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
    })
})

export { app, server, io }