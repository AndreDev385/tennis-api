import { CreateClashUseCase } from "./createClash";
import { CreateClashController } from "./createClashController";
import {
    sequelizeCategoryRepo,
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeSeasonRepo,
    sequelizeTeamRepo,
} from "../../repositories/";

const createClashUseCase = new CreateClashUseCase(
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo,
    sequelizeTeamRepo
);
const createClashController = new CreateClashController(createClashUseCase);

export { createClashController };
