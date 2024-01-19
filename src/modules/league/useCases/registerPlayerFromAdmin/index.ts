import { sequelizeUserRepo } from "../../../users/repositories";
import { sequelizeClubRepo, sequelizePlayerRepo } from "../../repositories";
import { RegisterPlayer } from "./registerPlayer";
import { RegisterPlayerController } from "./registerPlayerController";

const registerPlayer = new RegisterPlayer(
    sequelizeUserRepo,
    sequelizePlayerRepo,
    sequelizeClubRepo
);
const registerPlayerController = new RegisterPlayerController(registerPlayer);

export { registerPlayerController };
