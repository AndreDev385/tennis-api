require("dotenv").config();
const Sequelize = require("sequelize");

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    // test
    DB_NAME_TEST,
    NODE_ENV,
} = process.env;

const databaseCredentials = {
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
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    },
};

const { username, password, database, host, dialect } =
    databaseCredentials[NODE_ENV];

const mode = NODE_ENV == "production" ? "production" : "development";

console.log(`[DB]: Connecting to db ${database} in ${mode} mode`);
console.log(`[App]: ${host}`);

module.exports = {
    ...databaseCredentials,
    connection: new Sequelize(database, username, password, {
        host,
        dialect,
        port: 5432,
        dialectOptions: mode == "production" ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }: {},
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false,
    }),
};
