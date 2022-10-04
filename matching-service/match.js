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

// clear timeout and delete the entry from the hashmap
function clearPendingTimeout(id) {
    if (timeouts[id]) {
        logger.debug(`Clearing timeout for id ${id}`);
        clearTimeout(timeouts[id]);
        delete timeouts[id];
    }
}

function cancelPendingMatch(pendingMatch) {
    logger.debug(`Pending match is expired. Deleting.`);
    pendingMatch.destroy()
        .then(() => {
            this.io.to(pendingMatch.socketId).emit('match:fail', intToDiffMap[pendingMatch.diffInt]);
        });
}

async function findMatch(data) {
    const { userId, difficulty } = data;
    if (userId == null || difficulty == null) {
        return;
    }
    const diffInt = diffToIntMap[difficulty.toLowerCase()];
    logger.debug(`User ${userId} looking for match with difficulty: ${difficulty}`);

    // check whether there's any ongoing match for this user
    const { ongoing, roomId } = await hasOngoingMatch(userId);
    if (ongoing) {
        logger.debug(`User ${userId} has an ongoing match, returning the roomId.`);
        this.emit('match:exists', roomId);
        return;
    } 

    // cancel the previous pending match and start matching again
    const { matchFound, match } = await hasPendingMatch(userId);
    if (matchFound) {
        clearPendingTimeout(match.id);
        await match.destroy();
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
        clearPendingTimeout(pendingMatch.id);
        await pendingMatch.destroy();
        const matchRoomId = uuidv4();  // chance of collision is super low, so I'll just don't handle it for now...
        await db.Match.create({ roomId: matchRoomId, user1Id: pendingMatch.userId, user2Id: userId, ongoing: true });
        this.io.to(pendingMatch.socketId).emit('match:success', matchRoomId);
        this.emit('match:success', matchRoomId);
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
