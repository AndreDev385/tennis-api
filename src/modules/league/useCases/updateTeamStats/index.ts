import { sequelizeClashRepo, sequelizeTeamStatsRepo } from "../../repositories";
import { UpdateTeamStats } from "./updateTeamStats";

const updateTeamStats = new UpdateTeamStats(sequelizeTeamStatsRepo, sequelizeClashRepo);

export { updateTeamStats };
