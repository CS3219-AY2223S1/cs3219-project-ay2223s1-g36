import logger from './logger.js';
import db from './db/models/index.js';

async function getOngoingMatch(roomId, userId) {
    return db.Match.findOne({
        where: {
            roomId: roomId,
            [db.Sequelize.Op.or]: [{ user1Id: userId }, { user2Id: userId }],
            ongoing: true,
        },
    });
}

async function joinRoom(data) {
    const { userId, roomId } = JSON.parse(data);
    // check if the user has the permission to the room
    const match = await getOngoingMatch(roomId, userId);
    if (!match) {
        logger.debug(`Room ${roomId} doesn't exists or user ${userId} does not belong to this room!`);
        this.emit('room:join:fail', roomId);
        return;
    }

    this.join(roomId);
    logger.debug(`User ${userId} joined room ${roomId}`);
    const anotherUser = match.user1Id === userId ? match.user2Id : match.user1Id;
    const clients = this.io.sockets.adapter.rooms.get(roomId);
    const isConnected = clients ? clients.size === 2 : false;
    this.emit('room:join:success', {peer: anotherUser, isConnected: isConnected});
}

async function leaveRoom(data) {
    const { userId, roomId } = data;
    if (userId == null || roomId == null) {
        return;
    }
    const match = await getOngoingMatch(roomId, userId);
    if (!match) {
        logger.debug(`Room ${roomId} doesn't exists or user ${userId} does not belong to this room!`);
        this.emit('room:leave:fail', roomId);
        return;
    }
    this.leave(roomId);
    match.ongoing = false;
    await match.save();
    logger.debug(`Room ${roomId} is closed.`);
    this.emit('room:leave:success', roomId);
    this.io.to(roomId).emit('room:close', roomId);
}

export { joinRoom, leaveRoom };