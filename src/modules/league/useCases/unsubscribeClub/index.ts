import { sequelizeClubRepo } from "../../repositories";
import { UnsubscribeClub } from "./unsubscribeClub";
import { UnsubscribeClubController } from "./unsubscribeClubController";

const unsubscribeClub = new UnsubscribeClub(sequelizeClubRepo);

const unsubscribeClubController = new UnsubscribeClubController(
    unsubscribeClub
);

export { unsubscribeClubController };
