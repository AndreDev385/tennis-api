import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface JourneyData extends Model<InferAttributes<JourneyData>> {
    name: string;
}

const JourneyModel = sequelize.define<JourneyData>(
    "journey",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "journey" }
);

export { JourneyModel, JourneyData };
