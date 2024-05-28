import {
    sequelizeTournamentMatchRepo,
    sequelizeTournamentMatchTrackerRepo,
} from "../../repository";
import { UpdateMatch } from "./updateMatch";
import { UpdateTournamentMatchCtrl } from "./updateMatchController";

const updateMatch = new UpdateMatch(
    sequelizeTournamentMatchRepo,
    sequelizeTournamentMatchTrackerRepo
);

export const updateTournamentMatchCtrl = new UpdateTournamentMatchCtrl(
    updateMatch
);
