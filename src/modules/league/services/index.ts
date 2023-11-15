import { sequelizeTeamRepo } from "../repositories";
import { SequelizeTeamCreation } from "./teamCreation";
import { UploadImageCloudinary } from "./uploadImageCloudinary";

const uploadImageCloudinary = new UploadImageCloudinary();
const sequelizeTeamCreation = new SequelizeTeamCreation(sequelizeTeamRepo);

export { uploadImageCloudinary, sequelizeTeamCreation };
