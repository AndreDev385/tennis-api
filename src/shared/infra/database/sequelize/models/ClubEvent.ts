import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const ClubEventModel = sequelize.define(
    "clubEvent",
    {
        clubEventId: {
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
        tableName: "clubEvent",
    }
);

export { ClubEventModel };
