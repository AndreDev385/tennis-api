import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const PausedMatchModel = sequelize.define(
    "pausedMatch",
    {
        matchId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        setsQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gamesPerSet: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTiebreak: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        statistics: {
            type: DataTypes.STRING,
            allowNull: true
        },
        player1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        player4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        initialTeam: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        doubleServeFlow: {
            type: DataTypes.JSON,
            allowNull: true
        },
        singleServeFlow: {
            type: DataTypes.JSON,
            allowNull: true
        },
        sets: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
        },
        currentSetIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentGame: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        setsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        setsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchWon: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        matchFinish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    { tableName: "pausedMatch" }
);

export { PausedMatchModel };
