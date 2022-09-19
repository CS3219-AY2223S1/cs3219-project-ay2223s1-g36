import logger from './logger.js'
import db from './db/models/index.js'

async function findMatch(difficulty) {
    logger.debug(`Id ${this.id} looking for match with difficulty: ${difficulty}`);
    // TODO: there could be a case where both users are looking for a match at the same time, and one could see the other but not the other way round.
    // check if this guy is spamming for a match
    const prevRecord = await db.PendingMatch.findOne({
        where: {
            roomId: this.id
        }
    })
    if (prevRecord) {
        logger.debug(`Id ${this.id} has an unresolved pending match of difficulty ${prevRecord.difficulty}`)
        this.emit('match:pending', prevRecord.difficulty)
        return
    }

    // look for any pending matches
    const match = await db.PendingMatch.findOne({
        attributes: ['id', 'roomId', 'difficulty'],
        where: {
            difficulty: difficulty
        }
    })

    if (match) {
        logger.debug(`Found a match: ${match.roomId}`)
        // delete the record in the database, then join the room and let the clients know the match is successful
        await match.destroy()
        this.join(match.roomId)
        this.io.to(match.roomId).emit('match:success', match.roomId)
    } else {
        logger.debug("Couldn't find a match, waiting for more users to connect...")
        const pendingMatch = await db.PendingMatch.create({ roomId: this.id, difficulty: difficulty })
        await new Promise(resolve => setTimeout(resolve, 30000));  // if the match is successful, after 30 seconds the record will be gone
        
        if (await db.PendingMatch.findByPk(pendingMatch.id)) {  // match still exists in database --> unsuccessful
            logger.debug(`Match for ${this.id} is not successful. Dequeuing...`)
            await pendingMatch.destroy();
            this.emit('match:fail', difficulty)
        }
    }
}

export { findMatch }
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