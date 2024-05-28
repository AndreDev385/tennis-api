import { sequelizeContestTeamRepo } from "../../repository";
import { RemoveParticipantFromTeam } from "./remove";
import { RemoveParticipantFromTeamCtrl } from "./removeParticipantFromTeamController";

const removeParticipantFromTeam = new RemoveParticipantFromTeam(
    sequelizeContestTeamRepo
);

export const removeParticipantFromTeamCtrl = new RemoveParticipantFromTeamCtrl(
    removeParticipantFromTeam
);
