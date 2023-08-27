import config from "../config/config";
import { DataTypes, Sequelize } from "sequelize";
import { UserModel } from "./BaseUser";

const sequelize: Sequelize = config.connection;

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
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        }
    },
    { tableName: "player" }
);

PlayerModel.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "userId",
    as: "user",
});

export { PlayerModel };
