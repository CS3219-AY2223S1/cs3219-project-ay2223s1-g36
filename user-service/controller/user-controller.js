import jwt from 'jsonwebtoken'
import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormCheckUserExistence as _checkUser } from '../model/user-orm.js'
import { ormCheckCredentials as _checkCredentials } from '../model/user-orm.js'
import { ormSaveToken as _saveToken } from '../model/user-orm.js'
import { ormCheckToken as _checkToken } from '../model/user-orm.js'
import { ormDeleteUser as _deleteUser } from '../model/user-orm.js'
import { ormUpdatePassword as _updatePassword } from '../model/user-orm.js'
import { ormLogoutUser as _logoutUser } from '../model/user-orm.js'

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
            return res.status(409).json({message: `Sorry, this username is already taken.`});
        } 
    
        console.log(`The username ${username} is available!`);

        const resp = await _createUser(username, password);
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
    try {
        const { username, password } = req.body;

        // Validate all entry field are filled     
        if (!(username && password)) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }

        // Checks if the login details is correct
        const [credMatch, userDetails] = await _checkCredentials(username, password);

        // Locate user and authenticate the login
        if (credMatch) {
            // Prevents user from logging in via the same token
            const cookieToken = req.cookies.token;
            try {
                if (userDetails.token == cookieToken && await _checkToken(cookieToken)) {
                    return res.status(400).json({message: 'User is already logged in!'})
                } 
            } catch (err) {
                // Proceeds to generate if token expired and login is attempted
                if (!(err instanceof jwt.TokenExpiredError)) {
                    return res.status(400).json({message: 'Error checking database!'})
                }
            }

            // Generate JWT and send the cookie to user
            const [tokenSaved, token] = await _saveToken(username);
            if (tokenSaved) {
                console.log(`Successful login!`);
                return res.status(200).cookie('token', token).json({message: `${username} is logged in.`, username: username, token: token});
            } else {
                return res.status(500).json({message: 'Error creating JWT token'});
            }
        } else {
            if (userDetails) {
                console.log(`Login failed. Incorrect credentials.`);
                return res.status(401).json({message: `Login failed. Username or password is incorrect.`});
            } else {
                console.log(`Login failed. User does not exist.`);
                return res.status(401).json({message: `User not found. Please create an account first.`});
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Error logging in! Please check credentials'})
    }
}

// Middleware for user authentication before action takes place
export async function authenticateUser(req, res, next) {
    try {
        const {token} = req.cookies;
        console.log(req.cookies);
        if (!token) {
            return res.status(401).json({message: 'Please login to access the data'});
        }

        // Check that token is correct and matches with database
        const validToken  = await _checkToken(token);
        
        if (validToken == false) {
            throw 'Error authenticating user.'
        }

        console.log("Authentication successful!");
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: `Authentication failed: ${err}`});
    }
}

export async function deleteUser(req, res) {
    try {
        const {username} = req.body;

        await _deleteUser(username);

        return res.status(200).json({message: 'Account deleted successfully!'});
    } catch (err) {
        return res.status(400).json({message: 'Error deleting account. Please try again!'})
    }
}

export async function updatePassword(req, res) {
    try {
        const {username, newPassword} = req.body;

        await _updatePassword(username, newPassword);

        return res.status(200).json({message: "Password updated successfully!"})
    } catch (err) {
        return res.status(400).json({message: `Error updating password.\n${error}`});
    }
}

export async function logoutUser(req, res) {
    try {
        const {username} = req.body;

        await _logoutUser(username);

        return res.status(200).json({message: 'User logged out successfully'});

    } catch (err) {
        console.log(err);
        return res.status(400).json({message: err});
    }
}