import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import logger from './logger.js';
import { joinRoom, sendKey, sendSelect, saveEditor, sendLanguage, leaveRoom, MatchRouter } from './editor.js';
import { sendMessage } from './chat.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.use('/api', MatchRouter);

function setupIO(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        logger.info(`Connected! Socket ID: ${socket.id}`);
        // attach current io instance to this socket for match.js to use
        socket.io = io;
        socket.on('room:join', joinRoom.bind(socket));
        socket.on('editor:key', sendKey.bind(socket));
        socket.on('editor:selection', sendSelect.bind(socket));
        socket.on('editor:save', saveEditor.bind(socket));
        socket.on('editor:language', sendLanguage.bind(socket));
        socket.on('message:send', sendMessage.bind(socket));
        socket.on('room:leave', leaveRoom.bind(socket));
    });
    return io;
}

export {app, setupIO};