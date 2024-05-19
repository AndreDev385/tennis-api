import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";
import { ClubModel } from "./Club";
import { CategoryModel } from "./Category";

const sequelize: Sequelize = config.connection;

interface TeamData extends Model<InferAttributes<TeamData>> {
    teamId: string;
    clubId: string;
    categoryId: string;
    isDeleted: boolean;
    name: string;
}

const TeamModel = sequelize.define<TeamData>(
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
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
