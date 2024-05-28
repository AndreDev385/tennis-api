import { sequelizeHomeAdRepo } from "../../repository";
import { DeleteHomeAd } from "./deleteHomeAd";
import { DeleteHomeAdCtrl } from "./deleteHomeAdController";

const deleteHomeAd = new DeleteHomeAd(sequelizeHomeAdRepo);

export const deleteHomeAdCtrl = new DeleteHomeAdCtrl(deleteHomeAd);
