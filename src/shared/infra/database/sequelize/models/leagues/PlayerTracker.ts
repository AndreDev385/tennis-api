import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface PlayerTrackerData extends Model<InferAttributes<PlayerTrackerData>> {
    playerTrackerId: string;
    playerId: string;
    seasonId: string;
    isDouble: boolean;
    pointsWon: number;
    pointsWonServing: number;
    pointsWonReturning: number;
    pointsLost: number;
    pointsLostReturning: number;
    pointsLostServing: number;
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    gamesWonServing: number;
    gamesLostServing: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    firstServIn: number;
    secondServIn: number;
    firstServWon: number;
    secondServWon: number;
    aces: number;
    dobleFaults: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    firstReturnWon: number;
    secondReturnWon: number;
    firstReturnWinner: number;
    secondReturnWinner: number;
    meshPointsWon: number;
    meshPointsLost: number;
    meshError: number;
    meshWinner: number;
    bckgPointsWon: number;
    bckgPointsLost: number;
    bckgError: number;
    bckgWinner: number;
}

const PlayerTrackerModel = sequelize.define<PlayerTrackerData>(
    "playerTracker",
    {
        playerTrackerId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        seasonId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        isDouble: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        pointsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWonServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWonReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLostReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsLostServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        saveBreakPtsChances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPtsSaved: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesWonServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesLostServing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedFirstServ: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedSecondServ: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstServIn: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        secondServIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstServWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondServWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aces: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        dobleFaults: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        pointsWinnedFirstReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        pointsWinnedSecondReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnIn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnOut: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnOut: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        firstReturnWinner: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        secondReturnWinner: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshPointsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshPointsLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshWinner: {

            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        meshError: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgPointsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgPointsLost: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgWinner: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        bckgError: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    },
    { tableName: "playerTracker" }
);

export { PlayerTrackerModel };
