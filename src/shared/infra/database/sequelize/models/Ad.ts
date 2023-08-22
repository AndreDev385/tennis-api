import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const AdModel = sequelize.define(
    "ad",
    {
        adId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        clubId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "club",
                key: "clubId",
            },
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "ad",
    }
);

export { AdModel };
