import {
    sequelizeCategoryRepo,
    sequelizeClashRepo,
    sequelizePlayerRepo,
    sequelizeTrackerRepo,
    sequelizeMatchRepo,
} from "../../repositories";
import { CreateMatch } from "./createMatch";
import { CreateMatchController } from "./createMatchController";

const createMatch = new CreateMatch(
    sequelizeMatchRepo,
    sequelizePlayerRepo,
    sequelizeTrackerRepo,
    sequelizeClashRepo,
    sequelizeCategoryRepo
);

const createMatchController = new CreateMatchController(createMatch)

export {
    createMatchController,
}
