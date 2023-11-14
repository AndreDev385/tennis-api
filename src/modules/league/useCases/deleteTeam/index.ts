import { sequelizeTeamRepo } from "../../repositories";
import { DeleteTeam } from "./deleteTeam";
import { DeleteTeamController } from "./deleteTeamController"

const deleteTeam = new DeleteTeam(sequelizeTeamRepo)

const deleteTeamController = new DeleteTeamController(deleteTeam);

export { deleteTeamController }
