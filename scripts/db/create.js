const pg = require("pg");

require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_NAME_TEST, NODE_ENV } =
    process.env;

const base = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME_TEST,
        host: DB_HOST,
        dialect: "postgres",
    },
    production: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
    },
};

const { database, username, host, password } = base[NODE_ENV];

const client = new pg.Client({
    user: username,
    host,
    password,
    database,
    port: 5432,
});

client.connect((err) => {
    if (err) throw err;

    client.query(`CREATE DATABASE ${database}`, (err, result) => {
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
