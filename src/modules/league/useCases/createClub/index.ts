import { sequelizeClubRepo } from "../../repositories";
import { CreateClub } from "./createClub";
import { CreateClubController } from "./createClubController";

const createClub = new CreateClub(sequelizeClubRepo);
const createClubController = new CreateClubController(createClub);

export { createClubController };
