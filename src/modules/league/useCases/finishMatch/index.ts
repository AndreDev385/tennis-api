import { sequelizeMatchRepo, sequelizeSeasonRepo, sequelizeTrackerRepo } from "../../repositories";
import { FinishMatch } from "./finishMatch";
import { FinishMatchController } from "./finishMatchController";

const finishMatch = new FinishMatch(sequelizeMatchRepo, sequelizeTrackerRepo, sequelizeSeasonRepo);
const finishMatchController = new FinishMatchController(finishMatch);

export { finishMatchController };
