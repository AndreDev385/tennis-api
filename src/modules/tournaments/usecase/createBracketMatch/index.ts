import {
    sequelizeBracketRepo,
    sequelizeContestRepo,
    sequelizeTournamentMatchRepo,
    sequelizeTournamentMatchTrackerRepo,
    sequelizeTournamentRepo,
} from "../../repository";
import { CreateBracketMatch } from "./createBracketMatch";
import { CreateBracketMatchCtrl } from "./createBracketMatchController";

const createBracketMatch = new CreateBracketMatch(
    sequelizeTournamentMatchRepo,
    sequelizeBracketRepo,
    sequelizeContestRepo,
    sequelizeTournamentRepo,
    sequelizeTournamentMatchTrackerRepo
);

export const createBracketMatchCtrl = new CreateBracketMatchCtrl(
    createBracketMatch
);
