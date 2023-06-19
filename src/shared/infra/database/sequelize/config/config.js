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
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
    },
    test: {
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

const { username, password, database, host, dialect } =
    databaseCredentials[NODE_ENV];

const mode = NODE_ENV == "production" ? "production" : "development";

console.log(`[DB]: Connecting to db in ${mode} mode`);
console.log(`[App]: ${host}`);

module.exports = {
    ...databaseCredentials,
    connection: new Sequelize(database, username, password, {
        host,
        dialect,
        port: 5432,
        dialectOptions: {
            multipleStatements: true,
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        logging: false,
    }),
};
