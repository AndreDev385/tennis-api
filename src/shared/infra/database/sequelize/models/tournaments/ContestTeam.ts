import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";

const sequelize: Sequelize = config.connection;

export interface ContestTeamData
    extends Model<InferAttributes<ContestTeamData>> {
    contestTeamId: string;
    contestId: string;
    name: string;
    participantsIds: string[];
}

export const ContestTeamModel = sequelize.define<ContestTeamData>("contestTeam", {
    contestTeamId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    contestId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    participantsIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
    },
});
