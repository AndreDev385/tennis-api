import { CreateClashUseCase } from "./createClash";
import { CreateClashController } from "./createClashController";
import {
    sequelizeCategoryRepo,
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeSeasonRepo,
} from "../../repositories/";
import { sequelizeTeamCreation } from "../../services";

const createClashUseCase = new CreateClashUseCase(
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo,
    sequelizeTeamCreation,
);
const createClashController = new CreateClashController(createClashUseCase);

export { createClashController };
