import { sequelizeTournamentAdsRepo } from "../../repository";
import { DeleteTournamentAd } from "./deleteTournamentAd";
import { DeleteTournamentAdCtrl } from "./deleteTournamentAdController";

const deleteTournamentAd = new DeleteTournamentAd(sequelizeTournamentAdsRepo);

export const deleteTournamentAdCtrl = new DeleteTournamentAdCtrl(
    deleteTournamentAd
);
