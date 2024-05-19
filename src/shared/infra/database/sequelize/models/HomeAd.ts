import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface HomeAdData extends Model<InferAttributes<HomeAdData>> {
    link: string;
    image: string;
}

export const HomeAdModel = sequelize.define<HomeAdData>(
    "homeAd",
    {
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
