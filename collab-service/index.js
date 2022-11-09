import {createServer} from 'http';
import {app, setupIO} from './app.js';
import logger from './logger.js';

const PORT = process.env.PORT;
const httpServer = createServer(app);
const io = setupIO(httpServer);

httpServer.listen(PORT);
logger.info(`Collab-service starts listening on port ${PORT}`);
