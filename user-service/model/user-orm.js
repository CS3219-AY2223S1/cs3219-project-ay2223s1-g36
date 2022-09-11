import { createUser, findUser } from './repository.js';
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import mongoose from 'mongoose';

//need to separate orm functions from repository to decouple business logic from persistence

/**
 * Creates the user in the database
 * 
 * @param {String} username 
 * @param {String} password
 * @returns
 */
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({username, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

/**
 * Checks if the user exists in the database
 * 
 * @param {String} username 
 * @returns 
 */
export async function ormCheckUserExistence(username) {
    try {
        const user = await findUser({username});
        if (user && user.length) {
            console.log("user-orm: User already exists");
            return true;
        } else {
            console.log("user-orm: User does not exist");
            return false;
        }
    } catch (err) {
        console.log('ERROR: Could not find user');
        return { err };
    }
}

/**
 * Checks if the username & password combination inserted is correct
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export async function ormCheckCredentials(username, password) {
    try {
        const user = await findUser({username});
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("user-orm: User credentials match");
            return [true, user];
        } else {
            console.log("user-orm: User credentials do not match");
            return [false, null];
        }
    } catch (err) {
        console.log(err);
        return { err };
    }
}

/**
 * Creates and saves a token to the username associated
 * 
 * @param {String} username 
 * @returns 
 */
export async function ormSaveToken(username) {
    try {
        const user = await findUser({username});

        const token = jwt.sign(
            {user_id: user._id},
            process.env.TOKEN_KEY,
            {
                expiresIn:"2h",
            });
        
        user.token = token;
        await user.save();

        return [true, token];
    } catch (err) {
        console.log(err);
        return { err };
    }
}

// export async function ormLogOut(username, token) {
//     try {

//     }
// }

