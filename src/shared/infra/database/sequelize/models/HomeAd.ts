import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface HomeAdData extends Model<InferAttributes<HomeAdData>> {
	id?: number;
	link: string | null;
	image: string;
}

export const HomeAdModel = sequelize.define<HomeAdData>("homeAd", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	link: {
		type: DataTypes.STRING,
		defaultValue: null,
	},
});
