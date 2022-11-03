import {MongoClient} from 'mongodb';
import logger from './logger.js';
import express from 'express';

const mongoURI = process.env.NODE_ENV === "production" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
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

function leaveRoom() {
    logger.debug(`Leaving room ${this.roomId}...`);
    this.to(this.room).emit("user:leave");
    this.leave(this.room);
    this.room = undefined;
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

async function sendLanguage(data) {
    const { code, language = 'JavaScript' } = data;
    logger.debug(`Room ID: ${this.room} change language to ${language}`);
    upsertCode(client, this.room, code, language);
    this.to(this.room).emit("language:update", language);
}

function saveEditor(data) {
    const { code, language = 'JavaScript' } = data;
    logger.debug(`this.room: ${this.room}, code: ${code}, language: ${language}`);
    if (this.room == null || code == null) {
        logger.error(`roomId or code received is null: (${this.room}, ${code})`);
    } else {
        upsertCode(client, this.room, code, language);
        this.emit("editor:save:success");
    }
}

async function upsertCode(client, roomId, code, language) {
    const result = await client.db("collabdb").collection("code").updateOne({ _id: roomId }, { $set: {roomId: roomId, code: code, language: language} }, { upsert: true });
    logger.debug(`Save result: ${JSON.stringify(result)}`);
}

const router = express.Router()
// TODO: authenticate with JWT first?
router.post('/code', async (req, res) => {
    const { roomId } = req.body;
    const code = await client.db("collabdb").collection("code").findOne({ _id: roomId });
    if (code != null) {
        res.status(200).send({code: code.code, language: code.language});
    } else {
        res.status(200).send({ code: "", language: "JavaScript"})
    }
})

export { joinRoom, sendKey, sendSelect, saveEditor, sendLanguage, leaveRoom, router as MatchRouter };

