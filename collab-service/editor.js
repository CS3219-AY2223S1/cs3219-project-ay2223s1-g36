import {MongoClient} from 'mongodb';
import logger from './logger.js';

const mongoURI = process.env.DB_LOCAL_URI;
const client = new MongoClient(mongoURI);

try {
    // Connect to the MongoDB cluster
    await client.connect();
    logger.debug(`Connected to ${mongoURI}`);
} catch (err) {
    logger.error(`Failed to open database: ${err}`);
} 

function joinRoom(data) {
    const { roomId } = data;
    if (this.room !== roomId) {
        logger.debug(`Joining room ${roomId}...`);
        this.room = roomId;
        this.join(roomId);
    }
}

function sendKey(data) {
    const { change } = data;
    logger.debug(`Receiving data ${change} and sending out to ${this.room}...`);
    this.to(this.room).emit("editor:update", change);
}

function sendSelect(data) {
    const { selection } = data;
    logger.debug(`Receiving selection ${selection} and sending out...`);
    this.to(this.room).emit("editor:selection", selection);
}

function saveEditor(data) {
    const { code } = data;
    if (this.room === null || code === null) {
        logger.error(`roomId or code received is null: (${this.room}, ${code})`);
    } else {
        upsertCode(client, this.room, code);
    }
}

async function upsertCode(client, roomId, code) {
    const result = await client.db("collabdb").collection("code").updateOne({ _id: roomId }, { $set: {roomId: roomId, code: code} }, { upsert: true });
    logger.debug(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {
        logger.debug(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        logger.debug(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

export { joinRoom, sendKey, sendSelect, saveEditor };

