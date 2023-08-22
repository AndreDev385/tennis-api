import { sequelizeTeamStatsRepo } from "../../repositories";
import { ListTeamStats } from "./listTeamStats";
import { ListTeamStatsController } from "./listTeamStatsController";

const listTeamStats = new ListTeamStats(sequelizeTeamStatsRepo);

const listTeamStatsController = new ListTeamStatsController(listTeamStats);

export { listTeamStatsController };
