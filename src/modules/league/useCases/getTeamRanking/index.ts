import { sequelizeRankingRepo, sequelizeSeasonRepo, sequelizeTeamRepo } from "../../repositories";
import { GetTeamRanking } from "./getTeamRanking";
import { GetTeamRankingController } from "./getTeamRankingController";

const getTeamRanking = new GetTeamRanking(sequelizeTeamRepo, sequelizeRankingRepo, sequelizeSeasonRepo);
const getTeamRankingController = new GetTeamRankingController(getTeamRanking);

export { getTeamRankingController }
