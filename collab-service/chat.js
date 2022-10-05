import logger from './logger.js';

// TODO: maybe save the chat into mongo as well
function sendMessage(data) {
    const { roomId, userId, message } = JSON.parse(data);
    logger.debug(`Receiving message from ${userId}: ${message} and sending out...`);
    this.to(roomId).emit('message:receive', {userId: userId, message: message});
}

export { sendMessage };
