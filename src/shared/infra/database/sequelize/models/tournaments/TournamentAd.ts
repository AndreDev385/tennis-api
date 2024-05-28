import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentAddData
    extends Model<InferAttributes<TournamentAddData>> {
    tournamentId: string;
    link: string | null;
    image: string;
}

export const TournamentAdModel = sequelize.define<TournamentAddData>(
    "tournamentAd",
    {
        tournamentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
);
