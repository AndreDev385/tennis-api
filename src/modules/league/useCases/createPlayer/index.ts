import { sequelizeUserRepo } from "../../../users/repositories";
import { sequelizeClubRepo, sequelizePlayerRepo } from "../../repositories";
import { CreatePlayer } from "./createPlayer";
import { CreatePlayerController } from "./createPlayerController";

const createPlayer = new CreatePlayer(
    sequelizeUserRepo,
    sequelizePlayerRepo,
    sequelizeClubRepo
);
const createPlayerController = new CreatePlayerController(createPlayer);

export { createPlayerController };
