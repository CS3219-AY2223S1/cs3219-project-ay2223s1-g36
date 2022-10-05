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

function sendKey(data) {
    const { roomId, key } = JSON.parse(data);
    logger.debug(`Receiving key ${key} and sending out...`);
    this.to(roomId).emit("editor:key", key);
}

function sendSelect(data) {
    const { roomId, selection } = JSON.parse(data);
    logger.debug(`Receiving selection ${selection} and sending out...`);
    this.to(roomId).emit("editor:selection", selection);
}

function saveEditor(data) {
    const { roomId, code } = JSON.parse(data);
    if (roomId === null || code === null) {
        logger.error(`roomId or code received is null: (${roomId}, ${code})`);
    } else {
        upsertCode(client, roomId, code);
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

export { sendKey, sendSelect, saveEditor };

