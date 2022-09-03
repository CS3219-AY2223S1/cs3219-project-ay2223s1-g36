import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormCheckUserExistence as _checkUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const usernameTaken = await _checkUser(username);
            console.log("username is taken: " + usernameTaken)
            if (usernameTaken) {
                console.log(`The username ${username} is already taken.`)
                return res.status(400).json({message: `The username ${username} is already taken.`});
            } else {
                console.log(`The username ${username} is available!`)
                const resp = await _createUser(username, password);
                console.log(resp);            
                if (resp.err) {
                    return res.status(400).json({message: 'Could not create a new user!'});
                } else {
                    console.log(`Created new user ${username} successfully!`)
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