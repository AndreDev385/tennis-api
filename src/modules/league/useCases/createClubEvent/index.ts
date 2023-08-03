import { sequelizeClubEventRepo } from "../../repositories";
import { uploadImageCloudinary } from "../../services";
import { CreateClubEvent } from "./createClubEvent";
import { CreateClubEventController } from "./createClubEventController";

const createClubEvent = new CreateClubEvent(uploadImageCloudinary, sequelizeClubEventRepo);

const createClubEventController = new CreateClubEventController(createClubEvent);

export { createClubEventController };
