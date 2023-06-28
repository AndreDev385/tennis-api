import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";
import { SeasonModel } from "./Season";
import { CategoryModel } from "./Category";
import { TeamModel } from "./Team";

const sequelize: Sequelize = config.connection;

const ClashModel = sequelize.define(
    "clash",
    {
        clashId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "category",
                key: "categoryId",
            },
        },
        team1: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "team",
                key: "teamId",
            },
        },
        team2: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "team",
                key: "teamId",
            },
        },
        journey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "season",
                key: "seasonId",
            },
        },
        host: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "clash" }
);

ClashModel.belongsTo(SeasonModel, {
    foreignKey: "seasonId",
    targetKey: "seasonId",
    as: "season",
});

ClashModel.belongsTo(CategoryModel, {
    foreignKey: "categoryId",
    targetKey: "categoryId",
    as: "category",
});

ClashModel.belongsToMany(TeamModel, { through: "clash_team" })


export { ClashModel };
