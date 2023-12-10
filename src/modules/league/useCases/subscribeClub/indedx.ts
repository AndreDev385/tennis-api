import { sequelizeClubRepo } from "../../repositories";
import { SubscribeClub } from "./subscribeClub";
import { SubscribeClubController } from "./subscribeClubController";

const subscribeClub = new SubscribeClub(sequelizeClubRepo);
const subscribeClubController = new SubscribeClubController(subscribeClub);

export { subscribeClubController }
