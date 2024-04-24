import { uploadImageCloudinary } from "../../../league/services";
import { sequelizeTournamentRepo } from "../../repository";
import { NewTournament } from "./newTournament";
import { NewTournamentController } from "./newTournamentController";

const newTournament = new NewTournament(
    sequelizeTournamentRepo,
    uploadImageCloudinary
);

export const newTournamentCtrl = new NewTournamentController(newTournament);
