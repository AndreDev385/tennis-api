import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";
import { PlayerModel } from "./Player";

const sequelize: Sequelize = config.connection;

const PlayerTrackerModel = sequelize.define(
    "playerTracker",
    {
        playerTrackerId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        pointsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWonServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWonReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLostReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLostServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        saveBreakPtsChances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPtsSaved: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesWonServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesLostServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedFirstServ: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedSecondServ: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstServIn: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        secondServIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aces: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        dobleFaults: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        pointsWinnedFirstReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        pointsWinnedSecondReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnOut: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnOut: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshPointsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshPointsLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgPointsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgPointsLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        winners: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        noForcedErrors: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    },
    { tableName: "playerTracker" }
);

PlayerTrackerModel.belongsTo(PlayerModel, {
    foreignKey: "playerId",
    targetKey: "playerId",
    as: "Player",
});

export { PlayerTrackerModel };
