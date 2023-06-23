import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const ClubModel = sequelize.define(
    "club",
    {
        clubId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            defaultValue: null
        },
    },
    {
        tableName: "club",
    }
);

export { ClubModel };
