import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface ContestClashData
    extends Model<InferAttributes<ContestClashData>> {
    contestClashId: string;
    contestId: string;
    team1Id: string;
    team2Id: string;
    matchIds: string[];
    t1WonClash: boolean | null;
    isFinish: boolean;
}

export const ContestClashModel = sequelize.define<ContestClashData>(
    "contestClash",
    {
        contestClashId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        contestId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        team1Id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        team2Id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        matchIds: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: [],
        },
        t1WonClash: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        isFinish: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }
);
