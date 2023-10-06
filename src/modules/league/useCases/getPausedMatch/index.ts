import { sequelizePausedMatchRepo } from "../../repositories";
import { GetPausedMatch } from "./getPausedMatch";
import { GetPausedMatchController } from "./getPausedMatchController";

const getPausedMatch = new GetPausedMatch(sequelizePausedMatchRepo);
const getPausedMatchController = new GetPausedMatchController(getPausedMatch);

export { getPausedMatchController }
