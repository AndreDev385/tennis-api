import { Sequelize } from "sequelize";
import models from ".";

export default (sequelize: Sequelize, DataTypes: any) => {
    const TrackerModel = sequelize.define(
        "tracker",
        {
            trackerId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            me: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "playerTracker",
                    key: "playerTrackerId",
                },
            },
            partner: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "playerTracker",
                    key: "playerTrackerId",
                },
            },
            matchId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "match",
                    key: "matchId",
                },
            },

            gamesWonServing: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gamesWonReturning: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gamesLostServing: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gamesLostReturning: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            winBreakPtsChances: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            breakPtsWinned: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            rivalPointsWinnedFirstServ: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalPointsWinnedSecondServ: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalFirstServIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalSecondServIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalPointsWinnedFirstReturn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalPointsWinnedSecondReturn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalFirstReturnIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalSecondReturnIn: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            rivalAces: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalDobleFault: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalNoForcedErrors: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            rivalWinners: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            shortRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            mediumRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            longRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            shortRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            mediumRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            longRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        { timestamps: false, tableName: "tracker" }
    );

    TrackerModel.belongsTo(models.MatchModel);
    TrackerModel.hasOne(models.PlayerTrackerModel, {
        as: "me",
    });
    TrackerModel.hasOne(models.PlayerTrackerModel, {
        as: "partner",
    });

    return TrackerModel;
};
