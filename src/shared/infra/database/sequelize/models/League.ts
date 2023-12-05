import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface LeagueData extends Model<InferAttributes<LeagueData>> {
    leagueId: string;
    name: string;
}

const LeagueModel = sequelize.define<LeagueData>(
    "league",
    {
        leagueId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "league" }
);

export { LeagueModel, LeagueData };
