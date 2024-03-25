import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface BracketData extends Model<InferAttributes<BracketData>> {
    id: string;
    tournamentId: string;
    matchId: string | null;
    left: string | null;
    right: string | null;
    parent: string | null;
    rightPlace: number;
    leftPlace: number;
    deep: number;
}

const BracketModel = sequelize.define<BracketData>("bracket", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    tournamentId: {
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
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    leftPlace: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deep: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { BracketModel, BracketData };
