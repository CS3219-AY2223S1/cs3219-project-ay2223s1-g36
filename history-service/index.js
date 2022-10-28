import express from 'express';
import cors from 'cors';
import axios from 'axios'
import { getUserMatchHist, getMatchCode } from './history.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin : process.env.CORS_ORIGIN.split("|"),
  credentials: true,
}))

const router = express.Router()

app.use('/api/history', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

router.get('/getUserHistory/:userId', getUserMatchHist)
router.get('/getMatchCode/:roomId', getMatchCode)

const HISTSVC_PORT = process.env.PORT;
app.listen(HISTSVC_PORT, () => console.log('history-service listening on port', HISTSVC_PORT));