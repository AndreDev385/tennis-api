import { sequelizeTournamentAdsRepo } from "../../repository";
import { ListTournamentAds } from "./listTournamentAds";
import { ListTournamentAdsCtrl } from "./listTournamentAdsController";

const listTournamentAds = new ListTournamentAds(sequelizeTournamentAdsRepo);

export const listTournamentAdsCtrl = new ListTournamentAdsCtrl(listTournamentAds);
