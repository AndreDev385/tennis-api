import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentMatchData
    extends Model<InferAttributes<TournamentMatchData>> {
    tournamentId: string;
    rules: string;
    mode: string;
    surface: string;
    sets: string[];
    superTieBreak: boolean;
    player1Id: string;
    player2Id: string;
    player3Id: string | null;
    player4Id: string | null;
    trackerId?: string | null;
    status: number;
    matchInfo?: string;
    matchWon?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export const TournamentMatchModel = sequelize.define<TournamentMatchData>(
    "tournamentMatch",
    {
        tournamentId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        rules: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sets: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
        },
        superTieBreak: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        player1Id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        player2Id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        player3Id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        player4Id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        trackerId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchInfo: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        matchWon: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },
    { tableName: "tournamentMatch" }
);
