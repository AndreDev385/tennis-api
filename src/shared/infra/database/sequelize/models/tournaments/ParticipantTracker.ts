import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface ParticipantTrackerData
    extends Model<InferAttributes<ParticipantTrackerData>> {
    participantTrackerId: string;
    participantId: string;
    tournamentId: string;
    matchId: string;

    isDouble: boolean;
    // serv
    saveBreakPtsChances: number;
    breakPtsChances: number;
    breakPtsSaved: number;
    breakPts: number;
    firstServIn: number;
    secondServIn: number;
    aces: number;
    dobleFaults: number;
    firstServWon: number; // Saque no devuelto
    secondServWon: number; // Saque no devuelto
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    gamesWonServing: number;
    gamesLostServing: number;
    gamesWonReturning: number;
    gamesLostReturning: number;
    // return
    firstReturnWon: number; // boton devolucion ganada
    secondReturnWon: number; // botton devolucion ganada
    firstReturnWinner: number; // winner con devolucion ganada
    secondReturnWinner: number; // winner con devolucion ganada
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    // places
    meshPointsWon: number; // malla
    meshPointsLost: number; // malla
    meshWinner: number;
    meshError: number;
    bckgPointsWon: number; // fondo/approach
    bckgPointsLost: number; // fondo/approach
    bckgWinner: number;
    bckgError: number;
    // rally
    shortRallyWon: number;
    shortRallyLost: number;
    mediumRallyWon: number;
    mediumRallyLost: number;
    longRallyWon: number;
    longRallyLost: number;
    createdAt: Date;
    updatedAt: Date;
}

export const ParticipantTrackerModel = sequelize.define<ParticipantTrackerData>(
    "participantTracker",
    {
        participantTrackerId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        participantId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tournamentId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        matchId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        isDouble: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // serv
        saveBreakPtsChances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPtsChances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPtsSaved: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        breakPts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstServIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondServIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aces: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dobleFaults: {
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
        pointsWinnedFirstServ: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedSecondServ: {
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
        gamesWonReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gamesLostReturning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // return
        firstReturnWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondReturnWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstReturnWinner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondReturnWinner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstReturnIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondReturnIn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstReturnOut: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondReturnOut: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedFirstReturn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pointsWinnedSecondReturn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // places
        meshPointsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        meshPointsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        meshWinner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        meshError: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bckgPointsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bckgPointsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bckgWinner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bckgError: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // rally
        shortRallyWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shortRallyLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mediumRallyWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mediumRallyLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longRallyWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longRallyLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    { tableName: "participantTracker" }
);
