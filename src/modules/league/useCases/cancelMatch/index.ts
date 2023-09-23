import { sequelizeMatchRepo, sequelizeSeasonRepo, sequelizeTrackerRepo } from "../../repositories";
import { CancelMatch } from "./cancelMatch";
import { CancelMatchController } from "./cancelMatchController";

const cancelMatch = new CancelMatch(
    sequelizeMatchRepo,
    sequelizeTrackerRepo,
    sequelizeSeasonRepo,
);

const cancelMatchController = new CancelMatchController(cancelMatch);

export { cancelMatchController };
