import logger from './logger.js';

// TODO: maybe save the chat into mongo as well
function sendMessage(data) {
    const { userId, message, messageId } = data;
    logger.debug(`Receiving message from ${userId}: ${message} and sending out to room ${this.room}`);
    this.to(this.room).emit('message:receive', {userId, message, messageId});
}

export { sendMessage };
