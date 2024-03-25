import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentMatchTrackerData
    extends Model<InferAttributes<TournamentMatchTrackerData>> {
    matchId: string;
    player1: string;
    player2: string;
    player3?: string | null;
    player4?: string | null;
    shortRallyWon: number;
    shortRallyLost: number;
    mediumRallyWon: number;
    mediumRallyLost: number;
    longRallyWon: number;
    longRallyLost: number;
}

export const TournamentMatchTrackerModel =
    sequelize.define<TournamentMatchTrackerData>(
        "tournamentMatchTracker",
        {
            matchId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            player1: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            player2: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            player3: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            player4: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            shortRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            shortRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mediumRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            mediumRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            longRallyWon: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            longRallyLost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { tableName: "tournamentMatchTracker" }
    );
