import { sequelizeCategoryRepo } from "../../../league/repositories";
import { sequelizeTournamentRepo } from "../../repository";
import { NewTournament } from "./newTournament";
import { NewTournamentController } from "./newTournamentController";

const newTournament = new NewTournament(sequelizeTournamentRepo, sequelizeCategoryRepo)

const newTournamentCtrl = new NewTournamentController(newTournament);

export { newTournamentCtrl }
