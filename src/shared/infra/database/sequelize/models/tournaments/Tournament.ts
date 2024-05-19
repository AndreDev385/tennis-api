import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentData extends Model<InferAttributes<TournamentData>> {
    tournamentId: string;
    name: string;
    rules: string;
    status: number;
    startDate: Date;
    endDate: Date;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const TournamentModel = sequelize.define<TournamentData>(
    "tournament",
    {
        tournamentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rules: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
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
    { tableName: "tournament" }
);

export { TournamentModel };
