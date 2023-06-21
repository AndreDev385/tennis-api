import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const MatchModel = sequelize.define(
    "match",
    {
        matchId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        setsQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesPerSet: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTieBreak: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player1: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player3: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        player4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { tableName: "match" }
);

export { MatchModel };
