import { sequelizeTournamentMatchRepo } from "../../repository";
import { PaginateMatches } from "./paginateMatches";
import { PaginateMatchesCtrl } from "./paginateMatchesController";

const paginateMatches = new PaginateMatches(sequelizeTournamentMatchRepo);

export const paginateMatchesCtrl = new PaginateMatchesCtrl(paginateMatches);
