import { sequelizeTournamentRepo } from "../../repository";
import { NewTournament } from "./newTournament";
import { NewTournamentController } from "./newTournamentController";

const newTournament = new NewTournament(sequelizeTournamentRepo);

const newTournamentCtrl = new NewTournamentController(newTournament);

export { newTournamentCtrl };
