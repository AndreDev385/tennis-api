import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../config/config";

const sequelize: Sequelize = config.connection;

export interface TournamentMatchTrackerData
    extends Model<InferAttributes<TournamentMatchTrackerData>> {
    participantTrackerId: string;
    participantId: string;
    tournamentId: string;
    matchId: string;

    isDouble: boolean;
    // serv
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

export const ParticipantTracker =
    sequelize.define<TournamentMatchTrackerData>(
        "participantTracker",
        {
            participantTrackerId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
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
            firstServIn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondServIn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            aces: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            dobleFaults: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            firstServWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondServWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            pointsWinnedFirstServ: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            pointsWinnedSecondServ: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            gamesWonServing: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            gamesLostServing: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            gamesWonReturning: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            gamesLostReturning: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            // return
            firstReturnWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondReturnWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            firstReturnWinner: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondReturnWinner: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            firstReturnIn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondReturnIn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            firstReturnOut: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            secondReturnOut: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            pointsWinnedFirstReturn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            pointsWinnedSecondReturn: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            // places
            meshPointsWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            meshPointsLost: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            meshWinner: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            meshError: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            bckgPointsWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            bckgPointsLost: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            bckgWinner: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            bckgError: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            // rally
            shortRallyWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            shortRallyLost: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            mediumRallyWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            mediumRallyLost: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            longRallyWon: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            longRallyLost: {
                type: DataTypes.NUMBER,
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
