import { sequelizeAdRepo } from "../../repositories";
import { uploadImageCloudinary } from "../../services";
import { CreateAd } from "./createAd";
import { CreateAdController } from "./createAdController";

const createAd = new CreateAd(uploadImageCloudinary, sequelizeAdRepo);
const createAdController = new CreateAdController(createAd);

export { createAdController };

