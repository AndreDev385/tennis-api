import { sequelizeAdRepo } from "../../repositories";
import { DeleteAd } from "./deleteAd";
import { DeleteAdController } from "./deleteAdController";

const deleteAd = new DeleteAd(sequelizeAdRepo);
const deleteAdController = new DeleteAdController(deleteAd);

export { deleteAdController }
