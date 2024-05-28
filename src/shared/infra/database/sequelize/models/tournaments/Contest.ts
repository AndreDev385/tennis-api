import { DataTypes, InferAttributes, Model, Sequelize } from "sequelize";
import config from "../../config/config";
import { ParticipantModel } from "./Participant";
import { CoupleModel } from "./Couple";
import { ContestTeamModel } from "./ContestTeam";

const sequelize: Sequelize = config.connection;

export interface ContestData extends Model<InferAttributes<ContestData>> {
    contestId: string;
    tournamentId: string;
    mode: string;
    categoryType: number;
    category: string | null;
    summation: string | null;
    participants?: any[];
    couples?: any[];
    contestTeams?: any
}

const ContestModel = sequelize.define<ContestData>("contest", {
    contestId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    tournamentId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    mode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    summation: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

const ParticipantInscriptionModel = sequelize.define("participantInscription", {
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

ContestModel.belongsToMany(ParticipantModel, {
    through: ParticipantInscriptionModel,
});

ParticipantModel.belongsToMany(ContestModel, {
    through: ParticipantInscriptionModel,
});

const CoupleInscriptionModel = sequelize.define("coupleInscription", {
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

ContestModel.belongsToMany(CoupleModel, {
    through: CoupleInscriptionModel,
});

CoupleModel.belongsToMany(ContestModel, {
    through: CoupleInscriptionModel,
});


const TeamInscriptionModel = sequelize.define("teamInscription", {
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

ContestModel.belongsToMany(ContestTeamModel, {
    through: TeamInscriptionModel,
})

ContestTeamModel.belongsToMany(ContestModel, {
    through: TeamInscriptionModel,
})

export {
    ContestModel,
    ParticipantInscriptionModel,
    CoupleInscriptionModel,
};
