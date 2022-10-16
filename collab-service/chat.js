import logger from './logger.js';

// TODO: maybe save the chat into mongo as well
function sendMessage(data) {
    const {userId, message } = JSON.parse(data);
    logger.debug(`Receiving message from ${userId}: ${message} and sending out to room ${this.room}`);
    this.to(this.room).emit('message:receive', {userId: userId, message: message});
}

export { sendMessage };
