import {
    sequelizeContestClashRepo,
    sequelizeContestRepo,
    sequelizeParticipantRepo,
    sequelizeTournamentMatchRepo,
    sequelizeTournamentRepo,
} from "../../repository";
import { CreateClashMatchesCtrl } from "./createClashMatchesController";
import { CreateClashMatches } from "./createMatches";

const createClashMatches = new CreateClashMatches(
    sequelizeContestClashRepo,
    sequelizeTournamentMatchRepo,
    sequelizeTournamentRepo,
    sequelizeContestRepo,
    sequelizeParticipantRepo
);

export const createClashMatchesCtrl = new CreateClashMatchesCtrl(
    createClashMatches
);
