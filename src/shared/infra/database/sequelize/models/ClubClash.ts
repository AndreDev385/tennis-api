import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";
import { SeasonModel } from "./Season";
import { CategoryModel } from "./Category";
import { CategoryDto } from "../../../../../modules/league/dtos/categoryDto";

const sequelize: Sequelize = config.connection;

interface ClashData extends Model<InferAttributes<ClashData>> {
    clashId: string;
    categoryId: string;
    clubId: string;
    category?: CategoryDto;
    team1: string;
    team2: string;
    journey: string;
    seasonId: string;
    host: string;
    isFinish: boolean;
}

const ClashModel = sequelize.define<ClashData>(
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
        clubId: {
            type: DataTypes.UUID,
            allowNull: false,
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
        isFinish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

export { ClashModel, ClashData };
