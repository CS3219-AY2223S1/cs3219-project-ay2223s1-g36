import {db, umzug} from './db/models/index.js';

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.
try {
    await db.sequelize.authenticate();
    await umzug.up();
    console.log("Finish migration");
} catch (err) {
    console.log(err);
}

export default db;