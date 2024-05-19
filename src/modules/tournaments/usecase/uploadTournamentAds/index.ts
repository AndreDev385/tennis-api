import { uploadImageCloudinary } from "../../../league/services";
import { sequelizeTournamentAdsRepo } from "../../repository";
import { UploadTournamentAd } from "./uploadTournamentAd";
import { UploadTournamentAdCtrl } from "./uploadTournamentAdController";

const uploadTournamentAd = new UploadTournamentAd(
    uploadImageCloudinary,
    sequelizeTournamentAdsRepo
);

export const uploadTournamentAdCtrl = new UploadTournamentAdCtrl(
    uploadTournamentAd
);
