import { DataTypes, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

const TeamStatsModel = sequelize.define(
    "teamStats",
    {
        teamStatsId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        teamId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "team",
                key: "teamId",
            },
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "season",
                key: "seasonId",
            },
        },
        journey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gamesWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesPlayedAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesPlayedAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //sets
        setsWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        setsPlayedAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        setsWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        setsPlayedAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // super tie-break
        superTieBreaksWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTieBreaksPlayedAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTieBreaksWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTieBreaksPlayedAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // match won with first set won
        matchsWonWithFirstSetWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchsPlayedWithFirstSetWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchsWonWithFirstSetWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchsPlayedWithFirstSetWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // clash won
        clashWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clashPlayedAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clashWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clashPlayedAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { tableName: "teamStats" }
);

TeamStatsModel.belongsTo(TeamStatsModel, {
    foreignKey: "teamId",
    targetKey: "teamId",
    as: "team",
});

export { TeamStatsModel };
