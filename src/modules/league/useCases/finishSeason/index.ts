import { sequelizeSeasonRepo } from "../../repositories";
import { FinishSeason } from "./finishSeason";
import { FinishSeasonController } from "./finishSeasonController";

const finishSeason = new FinishSeason(sequelizeSeasonRepo);
const finishSeasonController = new FinishSeasonController(finishSeason);

export { finishSeasonController };
