import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentMatchTrackerData
    extends Model<InferAttributes<TournamentMatchTrackerData>> {
    trackerId: string;
    matchId: string;
    player1: string;
    player2: string;
    player3?: string | null;
    player4?: string | null;
}

export const TournamentMatchTrackerModel =
    sequelize.define<TournamentMatchTrackerData>(
        "tournamentMatchTracker",
        {
            trackerId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
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
        },
        { tableName: "tournamentMatchTracker" }
    );
