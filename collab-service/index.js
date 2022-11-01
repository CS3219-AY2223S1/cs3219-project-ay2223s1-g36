import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';
import { joinRoom, sendKey, sendSelect, saveEditor, sendLanguage, MatchRouter } from './editor.js';
import { sendMessage } from './chat.js';
import logger from './logger.js';

const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

app.use('/api', MatchRouter);

const httpServer = createServer(app);
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
});

httpServer.listen(PORT);
logger.info(`Collab-service starts listening on port ${PORT}`);

// TODO: the document ID should be roomID, then the document itself is the code
// TODO: use a middleware to handle authentication
// TODO: expose an API to allow retrieval of code