import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

interface PausedMatchData extends Model<InferAttributes<PausedMatchData>> {
    matchId: string;
    mode: string;
    setsQuantity: number;
    surface: string;
    gamesPerSet: number;
    superTiebreak: boolean | null;
    direction: string;
    statistics: string;
    player1: string;
    player2: string;
    player3: string | null;
    player4: string | null;
    initialTeam: number | null;
    doubleServeFlow: string | null;
    singleServeFlow: string | null;
    sets: Array<string>;
    currentSetIdx: number;
    currentGame: string;
    setsWon: number;
    setsLost: number;
    matchWon: boolean | null;
    matchFinish: boolean;
}

const PausedMatchModel = sequelize.define<PausedMatchData>(
    "pausedMatch",
    {
        matchId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        setsQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        surface: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gamesPerSet: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        superTiebreak: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        statistics: {
            type: DataTypes.STRING,
            allowNull: true
        },
        player1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        player4: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        initialTeam: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        doubleServeFlow: {
            type: DataTypes.JSON,
            allowNull: true
        },
        singleServeFlow: {
            type: DataTypes.JSON,
            allowNull: true
        },
        sets: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true,
        },
        currentSetIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentGame: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        setsWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        setsLost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matchWon: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        matchFinish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    { tableName: "pausedMatch" }
);

export { PausedMatchModel, PausedMatchData };
