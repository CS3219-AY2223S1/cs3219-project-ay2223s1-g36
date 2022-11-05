import express from 'express';
import cors from 'cors';
import { authenticateUser, createUser, loginUser, deleteUser, updatePassword, logoutUser } from './controller/user-controller.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: ['http://localhost', 'https://frontend-lpaj6pcqsa-as.a.run.app/', 'https://user-service-lpaj6pcqsa-as.a.run.app/'],
    credentials: true
}))

app.use(cookieParser())

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/deleteAccount', authenticateUser, deleteUser)
router.post('/updatePassword', authenticateUser, updatePassword)
router.post('/logout', authenticateUser, logoutUser)

router.post('/auth', authenticateUser, (req, res) => {
    res.status(200).send("Authenticated!");
});

app.use('/api/user', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', 'https://frontend-lpaj6pcqsa-as.a.run.app/');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
}, router)

app.listen(PORT, () => console.log(`user-service listening on port ${PORT}`));
