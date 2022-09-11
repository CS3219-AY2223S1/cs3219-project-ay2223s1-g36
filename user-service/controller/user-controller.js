import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormCheckUserExistence as _checkUser } from '../model/user-orm.js'
import { ormCheckCredentials as _checkCredentials } from '../model/user-orm.js'
import { ormSaveToken as _saveToken } from '../model/user-orm.js'
import bcrypt from 'bcrypt';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;

        // Validate all entry field are filled
        if (!(username && password)) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }

        const usernameExist = await _checkUser(username);

        if (usernameExist) {
            console.log(`The username ${username} already exists.`);
            return res.status(400).json({message: `The username ${username} already exists.`});
        } 
    
        console.log(`The username ${username} is available!`);

        const encryptedPassword = await bcrypt.hash(password, 10);
        const resp = await _createUser(username, encryptedPassword);
        console.log(resp);

        if (resp.err) {
            return res.status(400).json({message: 'Could not create a new user!'});
        } else {
            console.log(`Created new user ${username} successfully!`);
            return res.status(201).json({message: `Created new user ${username} successfully!`});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        // Validate all entry field are filled     
        if (!(username && password)) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }

        // Checks if the login details is correct
        const [userLogin, userDetails] = await _checkCredentials(username, password);

        // Prevents user from logging in via the same token


        // Locate user and authenticate the login
        if (userLogin) {
            console.log(`Successful login!`);

            // Generate JWT
            // TODO: double check the usage and appropriate parameters to pass in
            const [tokenSaved, token] = await _saveToken(username);
            if (tokenSaved) {
                return res.status(200).json({message: `${username} is logged in.`, token: token});
            } else {
                return res.status(500).json({message: 'Error creating JWT token'});
            }
        } else {
            console.log(`Login failed.`);
            return res.status(401).json({message: `Login failed. Access denied. Wrong username or password.`});
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure!'})
    }
}

