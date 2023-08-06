import { sequelizeTeamRepo } from "../../repositories";
import { ListTeams } from "./listTeams";
import { ListTeamsController } from "./listTeamsController";

const listTeams = new ListTeams(sequelizeTeamRepo);
const listTeamsController = new ListTeamsController(listTeams);

export { listTeamsController };
