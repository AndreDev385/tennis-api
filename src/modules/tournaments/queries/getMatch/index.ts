import { sequelizeTournamentMatchRepo } from "../../repository";
import { GetTournamentMatch } from "./getMatch";
import { GetTournamentMatchCtrl } from "./getMatchController";

const getMatch = new GetTournamentMatch(sequelizeTournamentMatchRepo);

export const getTournamentMatchCtrl = new GetTournamentMatchCtrl(getMatch);
