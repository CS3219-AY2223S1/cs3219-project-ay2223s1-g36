import { 
    ormCreateUser as _createUser ,
    ormViewUser as _viewUser,
    ormCheckUserExistence as _checkUser,
    ormCheckCredentials as _checkCredentials
} from '../model/user-orm.js'

import jwt from'jsonwebtoken';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const usernameTaken = await _checkUser(username);
            console.log("username is taken: " + usernameTaken);
            if (usernameTaken) {
                console.log(`The username ${username} is already taken.`);
                return res.status(400).json({message: `The username ${username} is already taken.`});
            } else {
                console.log(`The username ${username} is available!`);
                const resp = await _createUser(username, password);
                console.log(resp);            
                if (resp.err) {
                    return res.status(400).json({message: 'Could not create a new user!'});
                } else {
                    console.log(`Created new user ${username} successfully!`);
                    return res.status(201).json({message: `Created new user ${username} successfully!`});
                }
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function viewUser(req, res) {
    const userId = req.params.userid;
    try {
        if (userId) {
            const userDetails = await _viewUser(userId);
            if (userDetails.len) {
                return res.status(200).json({username: userDetails.username});
            } else {
                return res.status(400).json({message: `Invalid user ID provided.`});
            }
        } else {
            return res.status(400).json({message: 'User ID is missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure!'})
    }
}

export async function loginUser(req, res) {
    const SECRET_JWT_KEY = 'g36_secret_cjyk';
    try {
        const { username, password } = req.body;
        if (username && password) {
            const [userFound, userDetails] = await _checkCredentials(username, password);
            console.log(userDetails);
            if (userFound) {
                console.log(userDetails);
                console.log(userDetails._id.toString());
                console.log(`Successful login!`);

                // Generate JWT
                // TO-DO: double check the usage and appropriate parameters to pass in
                var timestamp = Date.now();
                const token = jwt.sign({username, timestamp}, SECRET_JWT_KEY);

                return res.status(200)
                            // .setHeader('Set-Cookie', ['token='+token])
                            .cookie('token', token, { httpOnly: true })
                            .json({message: `${username} is logged in. yay ok`, userid: userDetails.id , token: token});
            } else {
                console.log(`Login failed.`);
                return res.status(401).json({message: `Login failed. Access denied.`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure!'})
    }
}