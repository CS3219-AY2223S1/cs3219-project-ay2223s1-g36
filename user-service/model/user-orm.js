import { createUser, findUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
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

export async function ormCheckUserExistence(username) {
    try {
        const user = await findUser({username});
        if (user && user.length) {
            console.log("User already exists");
            return true;
        } else {
            console.log("User does not exist");
            return false;
        }
    } catch (err) {
        console.log('ERROR: Could not find user');
        return { err };
    }
}

export async function ormCheckCredentials(username, password) {
    try {
        const user = await findUser({username, password});
        if (user && user.length) {
            console.log("User credentials match");
            return [true, user];
        } else {
            console.log("User credentials do not match");
            return [false, null];
        }
    } catch (err) {
        console.log('ERROR: Could not find user');
        return { err };
    }
}

