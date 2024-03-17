import { sequelizeMatchRepo } from "../../repositories";
import { UpdateMatch } from "./updateMatch";
import { UpdateMatchController } from "./updateMatchController";

const updateMatch = new UpdateMatch(sequelizeMatchRepo);

const updateMatchCtrl = new UpdateMatchController(updateMatch)

export { updateMatchCtrl }
