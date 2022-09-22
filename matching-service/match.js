import logger from './logger.js';
import db from './db/models/index.js';
import { v4 as uuidv4 } from 'uuid';

const diffToIntMap = { 'easy': 1, 'medium': 2, 'hard': 3 };
const intToDiffMap = { 1: 'easy', 2: 'medium', 3: 'hard' };
var timeouts = {}; // data store for storing timeoutIds since can't store into database

async function hasOngoingMatch(userId) {
    const ongoingMatch = await db.Match.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ user1Id: userId }, { user2Id: userId }],
            ongoing: true,
        },
    });
    if (ongoingMatch) {
        return { ongoing: true, roomId: ongoingMatch.roomId };
    }
    return { ongoing: false };
}

async function hasPendingMatch(userId) {
    const pendingMatch = await db.PendingMatch.findOne({
        where: {
            userId: userId
        }
    });
    if (pendingMatch) {
        return { matchFound: true, match: pendingMatch };
    }
    return { matchFound: false };
}

function cancelPendingMatch(pendingMatch) {
    logger.debug(`Pending match is expired. Deleting.`);
    pendingMatch.destroy()
        .then(() => {
            this.io.to(pendingMatch.socketId).emit('match:fail', intToDiffMap[pendingMatch.diffInt]);
        });
}

async function findMatch(data) {
    const { userId, difficulty } = JSON.parse(data);
    const diffInt = diffToIntMap[difficulty];
    logger.debug(`User ${userId} looking for match with difficulty: ${difficulty}`);

    // check whether there's any ongoing match for this user
    const { ongoing, roomId } = await hasOngoingMatch(userId);
    if (ongoing) {
        logger.debug(`User ${userId} has an ongoing match, returning the roomId.`);
        this.emit('match:exists', roomId);
        return;
    } 
    const { matchFound, match } = await hasPendingMatch(userId);
    if (matchFound) {
        // in case of the server crash, delete the dangling pending match
        const now = new Date();
        const difference = (now - match.createdAt) / 1000;
        if (difference > 30) {
            logger.debug("Found a dangling pending match, deleting.");
            await match.destroy();
        } else {
            logger.debug(`Id ${userId} has an unresolved pending match`);
            this.emit('match:pending');
            return;
        }
    }

    // find any pending match with same difficulty
    const pendingMatch = await db.PendingMatch.findOne({
        where: {
            userId: {
                [db.Sequelize.Op.ne]: userId,
            },
            diffInt: diffInt
        },
        order: [['createdAt', 'ASC']], // find the oldest pending match for fairness
    });
    if (pendingMatch) {
        logger.debug(`Found a match between user ${userId} and user ${pendingMatch.userId}`);
        // stop the timeout for the previously waiting user
        if (timeouts[pendingMatch.id]) {
            logger.debug('Clearing timeout');
            clearTimeout(timeouts[pendingMatch.id]);
            delete timeouts[pendingMatch.id];
        }
        
        await pendingMatch.destroy();
        const matchRoomId = uuidv4();
        this.io.to(pendingMatch.socketId).emit('match:success', matchRoomId);
        this.emit('match:success', matchRoomId);
        await db.Match.create({ roomId: matchRoomId, user1Id: pendingMatch.userId, user2Id: userId, ongoing: true});
    } else { // create timeout and join the waiting room
        const initiator = await db.PendingMatch.create({ userId: userId, socketId: this.id, diffInt: diffInt });
        timeouts[initiator.id] = setTimeout(cancelPendingMatch.bind(this), 30000, initiator);
    }
    
}

export { findMatch };
// const router = express.Router()

// router.post('/match/easy', (req, res, next) => {
//     res.send('Matching easy')
// })
// router.post('/match/medium', (req, res, next) => {
//     res.send('Matching medium')
// })
// router.post('/match/hard', (req, res, next) => {
//     res.send('Matching hard')
// })

// export { router as MatchRouter }
