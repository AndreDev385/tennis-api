import {
	sequelizeBracketRepo,
	sequelizeContestClashRepo,
	sequelizeContestTeamRepo,
	sequelizeCoupleRepo,
	sequelizeParticipantRepo,
	sequelizeTournamentMatchRepo,
	sequelizeTournamentMatchTrackerRepo,
} from "../../repository";
import { UpdateBracket } from "./updateBracket";
import { UpdateBracketCtrl } from "./updateBracketController";

const updateBracket = new UpdateBracket(
	sequelizeBracketRepo,
	sequelizeParticipantRepo,
	sequelizeCoupleRepo,
	sequelizeContestTeamRepo,
	sequelizeTournamentMatchRepo,
	sequelizeTournamentMatchTrackerRepo,
	sequelizeContestClashRepo,
);

export const updateBracketCtrl = new UpdateBracketCtrl(updateBracket);
