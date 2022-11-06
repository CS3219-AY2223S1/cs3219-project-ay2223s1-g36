import UserModel from './user-model.js';
import 'dotenv/config'
import { MongoMemoryServer } from 'mongodb-memory-server';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.NODE_ENV === "production" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;


if (process.env.NODE_ENV === "test") {
  // Use temp storage for testing
  let memdb = await MongoMemoryServer.create();
  mongoDB = memdb.getUri();
} 

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('connected', function() {
  console.log('MongoDB connected successfully')
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params);
}

export async function findUser(params) {
  return UserModel.findOne(params).exec();
}

export async function deleteUser(params) {
  return UserModel.deleteOne(params);
}