import config from "../config/config";
import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import { UserModel } from "./BaseUser";

const sequelize: Sequelize = config.connection;

interface PlayerData extends Model<InferAttributes<PlayerData>> {
    playerId: string;
    clubId: string;
    userId: string;
    avatar?: string;
}

const PlayerModel = sequelize.define<PlayerData>(
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

export { PlayerModel, PlayerData };
