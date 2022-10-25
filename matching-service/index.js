import { createServer } from 'http';
import logger from './logger.js';
import { app, setupIO } from './app.js';

const PORT = process.env.PORT;
const httpServer = createServer(app);
const io = setupIO(httpServer);

httpServer.listen(PORT);
logger.info(`Server starts listening on port ${PORT}`);

