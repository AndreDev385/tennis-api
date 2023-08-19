import { sequelizeRankingRepo } from "../../repositories";
import { ListRankingController } from "./listRankingController";
import { ListRankings } from "./listRankings";

const listRankings = new ListRankings(sequelizeRankingRepo);
const listRankingsController = new ListRankingController(listRankings);

export { listRankingsController };
