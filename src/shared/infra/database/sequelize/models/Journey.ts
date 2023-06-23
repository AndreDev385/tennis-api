import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const JourneyModel = sequelize.define(
    "journey",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "journey" }
);

export { JourneyModel };
