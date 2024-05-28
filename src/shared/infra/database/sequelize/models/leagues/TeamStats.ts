import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface TeamStatsData extends Model<InferAttributes<TeamStatsData>> {
    teamStatsId: string;
    teamId: string;
    seasonId: string;
    journey: string;
    gamesWonAsLocal: number;
    gamesPlayedAsLocal: number;
    gamesWonAsVisitor: number;
    gamesPlayedAsVisitor: number;
    // sets
    setsWonAsLocal: number;
    setsPlayedAsLocal: number;
    setsWonAsVisitor: number;
    setsPlayedAsVisitor: number;
    // super tie-break
    superTieBreaksWonAsLocal: number;
    superTieBreaksPlayedAsLocal: number;
    superTieBreaksWonAsVisitor: number;
    superTieBreaksPlayedAsVisitor: number;
    // matchs
    matchWonAsLocal: number;
    matchLostAsLocal: number;
    matchPlayedAsLocal: number;
    matchWonAsVisitor: number;
    matchLostAsVisitor: number;
    matchPlayedAsVisitor: number;
    // match won with first set won
    matchsWonWithFirstSetWonAsLocal: number;
    matchsPlayedWithFirstSetWonAsLocal: number;
    matchsWonWithFirstSetWonAsVisitor: number;
    matchsPlayedWithFirstSetWonAsVisitor: number;
    // clash won
    clashWonAsLocal: number;
    clashPlayedAsLocal: number;
    clashWonAsVisitor: number;
    clashPlayedAsVisitor: number;
}

const TeamStatsModel = sequelize.define<TeamStatsData>(
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
        //games
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
        // matchs
        matchWonAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchLostAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchPlayedAsLocal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchWonAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchLostAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matchPlayedAsVisitor: {
            type: DataTypes.INTEGER,
            allowNull: false
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
