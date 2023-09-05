import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const RankingModel = sequelize.define(
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
            references: {
                model: "team",
                key: "teamId"
            }
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "season",
                key: "seasonId"
            }
        },
    },
    { tableName: "ranking" }
);

export { RankingModel };
