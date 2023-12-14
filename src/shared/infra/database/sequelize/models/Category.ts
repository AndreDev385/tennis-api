import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

interface CategoryData extends Model<InferAttributes<CategoryData>> {
    categoryId: string;
    name: string;
    fullName: string;
}

const CategoryModel = sequelize.define<CategoryData>(
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

export { CategoryModel, CategoryData };
