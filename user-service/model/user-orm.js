import { createUser, findUser, deleteUser } from './repository.js';
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
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({username, password: encryptedPassword});
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
        if (user) {
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

export async function ormCheckToken(token) {
    try {
        // TODO: Implement redisclient blacklisting later on

        // Terminate operation if token is undefined
        if (token == null) {
            return false;
        }
        
        // Check that token is correct and matches with database
        const verify = await jwt.verify(token, process.env.TOKEN_KEY);
        
        const user = await findUser({_id: verify.user_id});

        if (user.token == '') {
            return false;
        }
        
        return true;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export async function ormDeleteUser(username) {
    try {
        // User is authenticated via JWT before deleting
        await deleteUser({username});

        return true;
    } catch (err) {
        return {err};
    }
}

export async function ormUpdatePassword(username, newPassword) {
    try {
        // Encrypts new password and update database
        const encryptedNewPassword = await bcrypt.hash(newPassword, 10);
        const user = await findUser({username});
        user.password = encryptedNewPassword;
        user.save();
        return true;
    } catch (err) {
        return {err};
    }
}

export async function ormLogoutUser(username) {
    try {
        // User is authenticated via JWT before deleting
        const user = await findUser({username});

        user.token = '';
        user.save();

        return true;
    } catch (err) {
        return {err};
    }
}

