import QuestionModel from './question-model.js';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.NODE_ENV === "production" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('connected', function() {
  console.log('MongoDB connected successfully')
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const data = JSON.parse(fs.readFileSync('./ques.json', 'utf-8'))

const importData = async () => {
  try {
    await QuestionModel.create(data)
    console.log('data successfully imported')
    // to exit the process
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
}

QuestionModel.count(function (err, count) {
  if (!err && count === 0) {
      importData();
  } 
});

export async function findQues(params) {
  return QuestionModel.findOne({qid: parseInt(params.qid)});
}

export async function getQuesForDifficulty(params) {
  return QuestionModel.aggregate([
    {$match: {difficulty: parseInt(params.difficulty)}},
    {$sample: {size:1}}
  ])
}