import express from 'express';
import cors from 'cors';
import { connectiondb } from './db/connectiondb.js';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
import msgrouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);
app.use('/api/message', msgrouter);

app.get('/', () => {
    console.log('hi');
});

connectiondb();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port number ${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Corrected URL
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatsocket = socket;

    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.msg);
        }
    });
});
