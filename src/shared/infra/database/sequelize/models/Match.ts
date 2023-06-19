import { Sequelize } from "sequelize";
import models from ".";

export default (sequelize: Sequelize, DataTypes: any) => {
    const MatchModel = sequelize.define("match", {
        mode: {
            type: DataTypes.STRING,
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
            references: {
                model: "player",
                key: "playerId",
            },
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player3: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "player",
                key: "playerId",
            },
        },
        player4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    MatchModel.hasOne(models.TrackerModel);

    MatchModel.hasOne(models.PlayerModel, { as: "player1" });
    MatchModel.hasOne(models.PlayerModel, { as: "player2" });

    return MatchModel;
};
