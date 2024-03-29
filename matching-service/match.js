import logger from './logger.js';
import express from 'express';
// import db from './db/models/index.js';
import db from './db.js';
import axios from 'axios';
import { diffToIntMap, intToDiffMap } from './util.js';
import { v4 as uuidv4 } from 'uuid';

var timeouts = {}; // data store for storing timeoutIds since can't store into database

async function hasOngoingMatch(userId) {
    const ongoingMatch = await db.Match.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ user1Id: userId }, { user2Id: userId }],
            ongoing: true,
        },
    });
    if (ongoingMatch) {
        return { ongoing: true, roomId: ongoingMatch.roomId, questionId: ongoingMatch.questionId };
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
        logger.warn(`Bad request. userId: ${userId}, difficulty: ${difficulty}`);
        return;
    }
    const diffInt = diffToIntMap[difficulty.toLowerCase()];
    logger.debug(`User ${userId} looking for match with difficulty: ${difficulty}`);

    // check whether there's any ongoing match for this user
    const { ongoing, roomId, questionId } = await hasOngoingMatch(userId);
    if (ongoing) {
        logger.debug(`User ${userId} has an ongoing match, returning the roomId.`);
        this.emit('match:exists', {roomId, questionId});
        return;
    } 

    // cancel the previous pending match and start matching again
    const { matchFound, match } = await hasPendingMatch(userId);
    if (matchFound) {
        clearPendingTimeout(match.id);
        await match.destroy();
    }

    // find any pending match with same difficulty
    const [pendingMatch, created] = await db.PendingMatch.findOrCreate({
        where: {
            userId: {
                [db.Sequelize.Op.ne]: userId,
            },
            diffInt: diffInt
        },
        order: [['createdAt', 'ASC']], // find the oldest pending match for fairness
        defaults: { userId: userId, socketId: this.id, diffInt: diffInt }
    });
    
    if (created) {
        logger.debug(`User ${userId} waiting to find a match...`);
        timeouts[pendingMatch.id] = setTimeout(cancelPendingMatch.bind(this), 30000, pendingMatch);
    } else {
        logger.debug(`Found a match between user ${userId} and user ${pendingMatch.userId}`);
        // stop the timeout for the previously waiting user
        clearPendingTimeout(pendingMatch.id);
        await pendingMatch.destroy();
        const matchRoomId = uuidv4();  // chance of collision is super low, so I'll just don't handle it for now...
        
        // get question ID from question service
        let questionId;
        try {
            logger.debug(`Fetching question from ${process.env.QUESTION_SERVICE_URL}/api/question/getQuesForDifficulty/${diffInt}`);
            const res = await axios.get(`${process.env.QUESTION_SERVICE_URL}/api/question/getQuesForDifficulty/${diffInt}`)
            if (res && res.status === 200) {
                questionId = res.data[0].qid;
            } else {
                logger.error(`Question service returns bad response: ${res}`);
                this.emit('match:fail', difficulty);
                return;
            }
        } catch (err) {
            logger.error("Can't contact question service" + err);
            this.emit('match:fail', difficulty);
            return;
        }
        logger.debug(`questionId: ${questionId}`);

        await db.Match.create({ roomId: matchRoomId, questionId: questionId, user1Id: pendingMatch.userId, user2Id: userId, difficulty: difficulty.toLowerCase(), ongoing: true });
        const payload = {roomId: matchRoomId, questionId: questionId};
        this.io.to(pendingMatch.socketId).emit('match:success', payload);
        this.emit('match:success', payload);
    }
}

// TODO: authenticate with JWT later?
const router = express.Router()
router.get('/match/get/all', async (req, res) => {
    const matches = await db.Match.findAll();
    res.status(200).send({matches});
})

router.post('/match/get/user', async (req, res) => {
    const { userId } = req.body;
    const matches = await db.Match.findAll({
        where: {
            [db.Sequelize.Op.or]: [
                {user1Id: userId},
                {user2Id: userId}
            ]
        }
    })
    res.status(200).send({matches});
})

router.post('/match/get/room', async (req, res) => {
    const { roomId } = req.body;
    const matches = await db.Match.findAll({
        where: {
            roomId: roomId
        }
    })
    res.status(200).send({matches});
})

export { findMatch, router as MatchRouter };

