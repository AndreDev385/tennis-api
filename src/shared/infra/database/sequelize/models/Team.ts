import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";
import { ClubModel } from "./Club";
import { CategoryModel } from "./Category";

const sequelize: Sequelize = config.connection;

const TeamModel = sequelize.define(
    "team",
    {
        teamId: {
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
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "category",
                key: "categoryId",
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "team" }
);

TeamModel.belongsTo(ClubModel, {
    foreignKey: "clubId",
    targetKey: "clubId",
    as: "club",
});

TeamModel.belongsTo(CategoryModel, {
    foreignKey: "categoryId",
    targetKey: "categoryId",
    as: "category",
});

export { TeamModel };
