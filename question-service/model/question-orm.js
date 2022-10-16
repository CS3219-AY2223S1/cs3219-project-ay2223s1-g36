import mongoose from 'mongoose';
import { findQues, getQuesForDifficulty } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence

export async function ormGetQues(qid) {
    try {
        const ques = await findQues({qid})
        return ques;
    } catch (err) {
        console.log(err)
        return {err};
    }
}

export async function ormGetQuesForDifficulty(difficulty) {
    try {
        const ques = await getQuesForDifficulty({difficulty})
        return ques;
    } catch (err) {
        console.log(err)
        return {err};
    }
}