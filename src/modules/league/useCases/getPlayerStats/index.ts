import { sequelizePlayerRepo, sequelizePlayerTrackerRepo } from "../../repositories";
import { GetPlayerStats } from "./getPlayerStats";
import { GetPlayerStatsByUserIdController } from "./getPlayerStatsByUserIdController";
import { GetPlayerStatsController } from "./getPlayerStatsController";

const getPlayerStats = new GetPlayerStats(sequelizePlayerTrackerRepo, sequelizePlayerRepo);

const getPlayerStatsController = new GetPlayerStatsController(getPlayerStats);
const getPlayerStatsByUserIdController = new GetPlayerStatsByUserIdController(getPlayerStats);

export { getPlayerStatsController, getPlayerStatsByUserIdController };
