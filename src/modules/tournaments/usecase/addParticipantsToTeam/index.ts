import { sequelizeUserRepo } from "../../../users/repositories";
import {
    sequelizeContestTeamRepo,
    sequelizeParticipantRepo,
    sequelizeRegisterParticipantRepo,
} from "../../repository";
import { AddParticipantsToTeam } from "./addParticipantsToTeam";
import { AddParticipantsToTeamCtrl } from "./addParticipantsToTeamController";

const addParticipantsToTeam = new AddParticipantsToTeam(
    sequelizeContestTeamRepo,
    sequelizeParticipantRepo,
    sequelizeUserRepo,
    sequelizeRegisterParticipantRepo
);

export const addParticipantsToTeamCtrl = new AddParticipantsToTeamCtrl(
    addParticipantsToTeam
);
