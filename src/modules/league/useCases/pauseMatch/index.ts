import { sequelizeMatchRepo, sequelizePausedMatchRepo, sequelizeTrackerRepo } from "../../repositories";
import { PauseMatch } from "./pauseMatch";
import { PauseMatchController } from "./pauseMatchController";

const pauseMatch = new PauseMatch(
    sequelizeMatchRepo,
    sequelizeTrackerRepo,
    sequelizePausedMatchRepo,
);

const pauseMatchController = new PauseMatchController(pauseMatch);

export { pauseMatchController };
