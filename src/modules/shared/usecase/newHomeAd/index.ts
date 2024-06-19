import { uploadImageCloudinary } from "../../../league/services";
import { sequelizeHomeAdRepo } from "../../repository";
import { NewHomeAd } from "./newHomeAd";
import { NewHomeAdCtrl } from "./newHomeAdController";

const newHomeAd = new NewHomeAd(uploadImageCloudinary, sequelizeHomeAdRepo);

export const newHomeAdCtrl = new NewHomeAdCtrl(newHomeAd);
