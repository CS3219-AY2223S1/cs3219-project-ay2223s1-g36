import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {findMatch, MatchRouter} from './match.js';
import {joinRoom, leaveRoom} from './room.js';
import logger from './logger.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.use('/api', MatchRouter)

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  logger.info(`Connected! Socket ID: ${socket.id}, room: ${socket.rooms}`);
  // attach current io instance to this socket for match.js to use
  socket.io = io;
  socket.on('disconnect', () => { logger.info(`Connection ${socket.id} is closed.`); });
  socket.on('match:find', findMatch.bind(socket));
  socket.on('room:join', joinRoom.bind(socket));
  socket.on('room:leave', leaveRoom.bind(socket));
});

// app.set('io', io)
httpServer.listen(8001);
logger.info('Server starts listening on port 8001');

