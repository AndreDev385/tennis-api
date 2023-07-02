import { sequelizeMatchRepo, sequelizeTrackerRepo } from "../../repositories";
import { FinishMatch } from "./finishMatch";
import { FinishMatchController } from "./finishMatchController";

const finishMatch = new FinishMatch(sequelizeMatchRepo, sequelizeTrackerRepo);
const finishMatchController = new FinishMatchController(finishMatch);

export { finishMatchController };
