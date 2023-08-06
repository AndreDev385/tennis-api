import { sequelizePlayerRepo, sequelizePlayerTrackerRepo } from "../../repositories";
import { GetPlayerStats } from "./getPlayerStats";
import { GetPlayerStatsController } from "./getPlayerStatsController";

const getPlayerStats = new GetPlayerStats(sequelizePlayerTrackerRepo, sequelizePlayerRepo);

const getPlayerStatsController = new GetPlayerStatsController(getPlayerStats);

export { getPlayerStatsController };
