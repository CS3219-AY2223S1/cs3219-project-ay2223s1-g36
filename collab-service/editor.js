import {MongoClient} from 'mongodb';
import logger from './logger.js';
import express from 'express';

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
    const { key } = data;
    logger.debug(`Receiving key ${key} and sending out to ${this.room}...`);
    this.to(this.room).emit("editor:update", key);
}

function sendSelect(data) {
    const { selection } = data;
    logger.debug(`Receiving selection ${selection} and sending out...`);
    this.to(this.room).emit("editor:selection", selection);
}

function saveEditor(data) {
    const { code } = data;
    logger.debug(`this.room: ${this.room}, code: ${code}`);
    if (this.room === null || code === null) {
        logger.error(`roomId or code received is null: (${this.room}, ${code})`);
    } else {
        upsertCode(client, this.room, code);
    }
}

async function upsertCode(client, roomId, code) {
    const result = await client.db("collabdb").collection("code").updateOne({ _id: roomId }, { $set: {roomId: roomId, code: code} }, { upsert: true });
    logger.debug(`Save result: ${JSON.stringify(result)}`);
}

const router = express.Router()
// TODO: authenticate with JWT first?
router.get('/code', async (req, res) => {
    const { roomId } = req.body;
    const code = await client.db("collabdb").collection("code").findOne({ _id: roomId });
    res.status(200).send({code: code.code});
})

export { joinRoom, sendKey, sendSelect, saveEditor, router as MatchRouter };

