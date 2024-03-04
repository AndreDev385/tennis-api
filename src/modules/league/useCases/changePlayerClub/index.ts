import { sequelizeClubRepo, sequelizePlayerRepo } from "../../repositories";
import { ChangePlayerClub } from "./changePlayerClub";
import { ChangePlayerClubController } from "./changePlayerClubController";

const changePlayerClub = new ChangePlayerClub(
    sequelizePlayerRepo,
    sequelizeClubRepo
);

const changePlayerClubController = new ChangePlayerClubController(
    changePlayerClub
);

export { changePlayerClubController };
