import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentMatchTrackerData
    extends Model<InferAttributes<TournamentMatchTrackerData>> {
    trackerId: string;
    matchId: string;
    playerTracker1: string;
    playerTracker2: string;
    playerTracker3?: string | null;
    playerTracker4?: string | null;
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
            playerTracker1: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            playerTracker2: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            playerTracker3: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            playerTracker4: {
                type: DataTypes.UUID,
                allowNull: true,
            },
        },
        { tableName: "tournamentMatchTracker" }
    );
