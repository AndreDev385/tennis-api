import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";
import { UserModel } from "./BaseUser";

const sequelize: Sequelize = config.connection;

export interface ParticipantData
    extends Model<InferAttributes<ParticipantData>> {
    participantId: string;
    userId: string;
    avatar: string | null;
    device: string | null;
    isDeleted: boolean;
}

export const ParticipantModel = sequelize.define<ParticipantData>(
    "participant",
    {
        participantId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        device: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { tableName: "participant" }
);

ParticipantModel.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "userId",
    as: "User",
});
