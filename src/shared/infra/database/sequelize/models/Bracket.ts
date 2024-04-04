import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface BracketData extends Model<InferAttributes<BracketData>> {
    id: string;
    contestId: string;
    matchId: string | null;
    left: string | null;
    right: string | null;
    parent: string | null;
    rightPlace: string;
    leftPlace: string;
    deep: number;
}

const BracketModel = sequelize.define<BracketData>("bracket", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    contestId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    matchId: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    left: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    right: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    parent: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    rightPlace: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leftPlace: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deep: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { BracketModel, BracketData };
