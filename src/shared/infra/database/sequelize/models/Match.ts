import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";
import { ClashModel } from "./ClubClash";
import { CategoryModel } from "./Category";
import { CategoryDto } from "../../../../../modules/league/dtos/categoryDto";

const sequelize: Sequelize = config.connection;

interface MatchData extends Model<InferAttributes<MatchData>> {
    matchId: string;
    clashId: string;
    mode: string;
    categoryId: string;
    setsQuantity: number;
    sets: string[];
    gamesPerSet: number;
    superTieBreak: boolean;
    category?: CategoryDto;
    address: string | null;
    surface: string;
    player1: string;
    player2: string;
    player3: string | null;
    player4: string | null;
    status: number;
    matchWon: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}

const MatchModel = sequelize.define<MatchData>(
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
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchWon: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },
    { tableName: "match" }
);

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

export { MatchModel, MatchData };
