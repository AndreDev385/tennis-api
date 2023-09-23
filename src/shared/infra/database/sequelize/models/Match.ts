import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";
import { ClashModel } from "./ClubClash";
import { CategoryModel } from "./Category";

const sequelize: Sequelize = config.connection;

const MatchModel = sequelize.define(
    "match",
    {
        matchId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        clashId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "clash",
                key: "clashId",
            },
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "category",
                key: "categoryId",
            },
        },
        setsQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sets: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
        },
        gamesPerSet: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTieBreak: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player1: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player3: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        player4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isLive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isFinish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isCancelled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { tableName: "match" }
);

//MatchModel.afterUpdate(() => dispatchEventsCallback(MatchModel, 'matchId'))

MatchModel.belongsTo(ClashModel, {
    foreignKey: "clashId",
    targetKey: "clashId",
    as: "clash",
});

MatchModel.belongsTo(CategoryModel, {
    foreignKey: "categoryId",
    targetKey: "categoryId",
    as: "category",
});

export { MatchModel };
