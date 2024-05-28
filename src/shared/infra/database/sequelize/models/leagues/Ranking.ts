import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface RankingData extends Model<InferAttributes<RankingData>> {
    rankingId: string;
    position: string;
    symbol: string;
    teamId: string;
    seasonId: string;
}

const RankingModel = sequelize.define<RankingData>(
    "ranking",
    {
        rankingId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    { tableName: "ranking" }
);

export { RankingModel, RankingData };
