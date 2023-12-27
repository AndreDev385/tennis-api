import { sequelizeAdRepo } from "../../repositories";
import { ListAds } from "./listAds";
import { ListAdsController } from "./listAdsController";

const listAds = new ListAds(sequelizeAdRepo);
const listAdsController = new ListAdsController(listAds);

export { listAdsController };
