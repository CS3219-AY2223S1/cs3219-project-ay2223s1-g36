import express from 'express';
import cors from 'cors';
import { getQues } from './controller/question-controller.js';
import { getQuesForDifficulty } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors()) // config cors so that front-end can use
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
  }))

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from question-service'))

app.use('/api/question', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

router.get('/getQues/:qid', getQues)
router.get('/getQuesForDifficulty/:difficulty', getQuesForDifficulty)

const QNSVC_PORT = 8002;
app.listen(QNSVC_PORT, () => console.log('question-service listening on port', QNSVC_PORT));
