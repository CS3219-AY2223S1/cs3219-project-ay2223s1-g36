import mongoose from 'mongoose';
var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    qid: {
        type: Number,
        required: true,
        unique: true
    },
    difficulty: {
        type: Number,
        required: true,
        minimum: 1,
        maximum: 3
    },
    question_title: {
        type: String,
        required: true
    },
    question_text: {
        type: String,
        required: true
    },
})

export default mongoose.model('QuestionModel', QuestionModelSchema)
