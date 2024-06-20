import { sequelizeTournamentRepo } from "../../repository";
import { DeleteTournament } from "./deleteTournament";
import { DeleteTournamentCtrl } from "./deleteTournamentController";

const deleteTournament = new DeleteTournament(sequelizeTournamentRepo);

export const deleteTournamentCtrl = new DeleteTournamentCtrl(deleteTournament)
