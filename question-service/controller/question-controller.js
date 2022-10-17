import {ormGetQues as _getQues } from '../model/question-orm.js'
import {ormGetQuesForDifficulty as _getQuesForDifficulty } from '../model/question-orm.js'

export async function getQues(req, res) {
    const qid = req.params.qid;
    try {
        if (qid) {
            const ques = await _getQues(qid);
            if (ques) {
                return res.status(200).json(ques);
            } else {
                return res.status(400).json({message: `Invalid qid provided.`});
            }
        } else {
            return res.status(400).json({message: 'qid is missing!'});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure!'})
    }
}

export async function getQuesForDifficulty(req, res) {
    const difficulty = req.params.difficulty;
    try {
        if (difficulty > 3 || difficulty < 1 || !difficulty) {
            return res.status(400).json({message: `Invalid difficulty provided.`})
        }

        const ques = await _getQuesForDifficulty(difficulty);

        if (ques) {
            return res.status(200).json(ques);
        } else {
            return res.status(400).json({message: `Can't find question`})
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure!'})
    }
}