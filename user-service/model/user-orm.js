import { createUser, findUsername } from './repository.js';

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
        const user = await findUsername({username});
        console.log(user);
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

