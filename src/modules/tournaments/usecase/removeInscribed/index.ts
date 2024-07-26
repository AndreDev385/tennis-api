import {
	sequelizeContestRepo,
	sequelizeContestTeamRepo,
	sequelizeCoupleRepo,
	sequelizeParticipantRepo,
} from "../../repository";
import { RemoveInscribed } from "./removeInscribed";
import { RemoveInscribedCtrl } from "./removeInscribedController";

const removeInscribed = new RemoveInscribed(
	sequelizeContestRepo,
	sequelizeParticipantRepo,
	sequelizeCoupleRepo,
	sequelizeContestTeamRepo,
);

export const removeInscribedCtrl = new RemoveInscribedCtrl(removeInscribed);
