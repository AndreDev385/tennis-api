import { sequelizeClashRepo, sequelizeRankingRepo } from "../../repositories";
import { UpdateTeamRanking } from "./updateTeamRanking";

const updateTeamRanking = new UpdateTeamRanking(sequelizeRankingRepo, sequelizeClashRepo);

export { updateTeamRanking };
