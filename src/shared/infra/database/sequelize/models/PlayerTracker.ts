import { Sequelize } from "sequelize";
import models from ".";

export default (sequelize: Sequelize, DataTypes: any) => {
    const PlayerTrackerModel = sequelize.define(
        "playerTracker",
        {
            playerTrackerId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
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
                allowNull: true,
            },
            dobleFaults: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            pointsWinnedFirstReturn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            pointsWinnedSecondReturn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            firstReturnIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            secondReturnIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            meshPointsWon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            meshPointsLost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            bckgPointsWon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            bckgPointsLost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            winners: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            noForcedErrors: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        { timestamps: false, tableName: "playerTracker" }
    );

    PlayerTrackerModel.belongsTo(models.PlayerModel);

    return PlayerTrackerModel;
};
