import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";
import { SeasonModel } from "./Season";
import { MatchModel } from "./Match";

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
        club: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "club",
                key: "clubId",
            },
        },
        rivalClub: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "club",
                key: "clubId",
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
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "club",
                key: "clubId",
            },
        },
    },
    { tableName: "clash" }
);

ClashModel.belongsTo(SeasonModel, {
    foreignKey: "seasonId",
    targetKey: "seasonId",
    as: "season",
});

export { ClashModel };
