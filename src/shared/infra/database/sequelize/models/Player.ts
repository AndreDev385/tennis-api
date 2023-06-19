import { Sequelize } from "sequelize";
import models from ".";

export default (sequelize: Sequelize, DataTypes: any) => {
    const PlayerModel = sequelize.define(
        "player",
        {
            playerId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            clubId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: "club",
                    key: "clubId",
                },
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "user",
                    key: "userId",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
        },
        { timestamps: false, tableName: "user" }
    );

    PlayerModel.belongsTo(models.UserModel)
    PlayerModel.hasMany(models.PlayerTrackerModel)

    return PlayerModel;
};
