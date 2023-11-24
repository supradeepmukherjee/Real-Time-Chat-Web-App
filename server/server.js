import app from './app.js';
import { createServer } from 'node:http';
import cloud from 'cloudinary'
import { Server } from 'socket.io';
import { connectDatabase } from './config/database.js';

const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

cloud.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
})

connectDatabase()

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('setup', userData => {
        socket.join(userData._id)
        socket.emit('connected')
    })
    socket.on('join chat', room => socket.join(room))
    socket.on('typing', room => socket.in(room).emit('typing'))
    socket.on('typing stopped', room => socket.in(room).emit('typing stopped'))
    socket.on('new msg', newMsgReceived => {
        console.log(newMsgReceived)
        let chat = newMsgReceived.chat
        if (!chat.users) return console.log('chat.users kuch nahi hota')
        chat.users.forEach(user => {
            if (user._id == newMsgReceived.sender._id) return
            socket.in(user._id).emit('msg received', newMsgReceived)
        });
    })
    socket.off('setup', () => socket.leave(userData._id))
});

server.listen(process.env.PORT, () => console.log(process.env.PORT))