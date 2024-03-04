import { sequelizeClubRepo } from "../../../league/repositories";
import {
    sequelizePlayerRegisterRepo,
    sequelizeUserRepo,
} from "../../../users/repositories";
import { RegisterPlayer } from "./registerPlayer";
import { RegisterPlayerBulk } from "./registerPlayerBulk";
import { RegisterPlayerBulkController } from "./registerPlayerBulkController";
import { RegisterPlayerController } from "./registerPlayerController";

const registerPlayer = new RegisterPlayer(
    sequelizeUserRepo,
    sequelizeClubRepo,
    sequelizePlayerRegisterRepo
);
const registerPlayerBulk = new RegisterPlayerBulk(
    sequelizeUserRepo,
    sequelizeClubRepo,
    sequelizePlayerRegisterRepo
);

const registerPlayerController = new RegisterPlayerController(registerPlayer);
const registerPlayerBulkController = new RegisterPlayerBulkController(
    registerPlayerBulk
);

export { registerPlayerController, registerPlayerBulkController };
