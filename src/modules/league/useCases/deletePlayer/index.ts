import { sequelizePlayerRepo } from "../../repositories";
import { DeletePlayer } from "./deletePlayer";
import { DeletePlayerController } from "./deletePlayerController";

const deletePlayer = new DeletePlayer(sequelizePlayerRepo);
const deletePlayerController = new DeletePlayerController(deletePlayer);

export { deletePlayerController };
