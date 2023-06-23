import { CreateClashUseCase } from "./createClash";
import { CreateClashController } from "./createClashController";
import { sequelizeClashRepo } from "../../repositories/";
import { sequelizeClubRepo } from "../../repositories/";
import { sequelizeCategoryRepo } from "../../repositories/";
import { sequelizeSeasonRepo } from "../../repositories/";

const createClashUseCase = new CreateClashUseCase(
    sequelizeClashRepo,
    sequelizeClubRepo,
    sequelizeCategoryRepo,
    sequelizeSeasonRepo
);
const createClashController = new CreateClashController(createClashUseCase);

export { createClashController };
