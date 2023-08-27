import { sequelizeSeasonRepo } from "../../repositories";
import { CreateSeason } from "./createSeason";
import { CreateSeasonController } from "./createSeasonController";

const createSeason = new CreateSeason(sequelizeSeasonRepo);
const createSeasonController = new CreateSeasonController(createSeason);

export { createSeasonController };
