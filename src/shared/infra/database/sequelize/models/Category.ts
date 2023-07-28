import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const CategoryModel = sequelize.define(
    "category",
    {
        categoryId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "category" }
);

export { CategoryModel };
