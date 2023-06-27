import { sequelizePlayerRepo } from "../../repositories";
import { ListPlayers } from "./listPlayers";
import { ListPlayerController } from "./listPlayersController";

const listPlayers = new ListPlayers(sequelizePlayerRepo);
const listPlayersController = new ListPlayerController(listPlayers);

export { listPlayersController };
