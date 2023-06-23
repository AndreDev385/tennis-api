import { sequelizeLeagueRepo } from "../../repositories/";
import { ListLeague } from "./listLeague";
import { ListLeagueController } from "./listLeagueController";

const listLeague = new ListLeague(sequelizeLeagueRepo)
const listLeagueController = new ListLeagueController(listLeague)

export {
    listLeagueController,
}
