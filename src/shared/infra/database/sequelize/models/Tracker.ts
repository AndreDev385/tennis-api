import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";
import { MatchModel } from "./Match";

const sequelize: Sequelize = config.connection;

interface TrackerData extends Model<InferAttributes<TrackerData>> {
    trackerId: string;
    me: string;
    partner: string | null;
    matchId: string;
    gamesWonReturning: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;

    rivalPointsWinnedFirstServ: number;
    rivalPointsWinnedSecondServ: number;
    rivalFirstServIn: number;
    rivalSecondServIn: number;
    rivalFirstServWon: number;
    rivalSecondServWon: number;
    rivalPointsWinnedFirstReturn: number;
    rivalPointsWinnedSecondReturn: number;
    rivalFirstReturnIn: number;
    rivalSecondReturnIn: number;

    rivalAces: number;
    rivalDobleFault: number;
    rivalNoForcedErrors: number;
    rivalWinners: number;
    shortRallyWon: number;
    mediumRallyWon: number;
    longRallyWon: number;
    shortRallyLost: number;
    mediumRallyLost: number;
    longRallyLost: number;
}

const TrackerModel = sequelize.define<TrackerData>(
    "tracker",
    {
        trackerId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        me: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        partner: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        matchId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
                model: "match",
                key: "matchId",
            },
        },
        gamesWonReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesLostReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        winBreakPtsChances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPtsWinned: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        rivalPointsWinnedFirstServ: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalPointsWinnedSecondServ: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalFirstServWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalSecondServWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalFirstServIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalSecondServIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalPointsWinnedFirstReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalPointsWinnedSecondReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalFirstReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalSecondReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },

        rivalAces: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalDobleFault: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalNoForcedErrors: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rivalWinners: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        shortRallyWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        mediumRallyWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        longRallyWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        shortRallyLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        mediumRallyLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        longRallyLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    },
    { tableName: "tracker" }
);

TrackerModel.belongsTo(MatchModel, {
    foreignKey: "matchId",
    targetKey: "matchId",
    as: "Match",
    onDelete: "CASCADE"
});

export { TrackerModel, TrackerData };
