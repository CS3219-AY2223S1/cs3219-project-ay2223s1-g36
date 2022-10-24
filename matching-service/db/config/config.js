require('dotenv').config(); // this is important!
module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "db/db/development.sqlite3"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "dialect": process.env.PROD_SQL_DIALECT,
        "host": process.env.PROD_SQL_HOST,
        "dialectOptions": {
            "socketPath": process.env.PROD_SQL_HOST
        }
    }
}