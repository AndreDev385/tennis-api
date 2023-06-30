import { sequelizeMatchRepo, sequelizeTrackerRepo } from "../../repositories";
import { GoMatchLive } from "./goMatchLive";
import { GoMatchLiveController } from "./goMatchLiveController";

const goMatchLive = new GoMatchLive(sequelizeMatchRepo, sequelizeTrackerRepo);
const goMatchLiveController = new GoMatchLiveController(goMatchLive);

export { goMatchLiveController };
