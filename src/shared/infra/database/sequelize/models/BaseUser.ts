import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface UserData extends Model<InferAttributes<UserData>> {
    userId: string;
    email: string;
    password: string | null;
    firstName: string;
    lastName: string;
    recoverPasswordCode: string | null;
    canTrack: boolean;
    isAdmin: boolean;
    isPlayer: boolean;
    accessToken: string | null;
    isDeleted: boolean;
}

const UserModel = sequelize.define<UserData>("users", {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    recoverPasswordCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    canTrack: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    isPlayer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
    accessToken: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: null,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export { UserModel, UserData }
