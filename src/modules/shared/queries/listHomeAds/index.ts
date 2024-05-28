import { sequelizeHomeAdRepo } from "../../repository";
import { ListHomeAds } from "./listHomeAds";
import { ListHomeAdsCtrl } from "./listHomeAdsController";

const listHomeAds = new ListHomeAds(sequelizeHomeAdRepo);

export const listHomeAdsCtrl = new ListHomeAdsCtrl(listHomeAds);
