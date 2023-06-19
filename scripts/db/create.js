const pg = require("pg");

require("dotenv").config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_NAME_TEST,
    NODE_ENV,
} = process.env;

const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    database: DB_NAME
};

console.log(`DBNAME: ${DB_NAME}`);

const client = new pg.Client(config);

client.connect((err) => {
    if (err) throw err;

    client.query(`CREATE DATABASE ${DB_NAME}`, (err, result) => {
        if (err && err.code === "42P04") {
            console.log("Db already created");
            process.exit(0);
        }

        if (err) {
            throw err;
        }

        console.log("Created db");
        process.exit(0);
    });
});
