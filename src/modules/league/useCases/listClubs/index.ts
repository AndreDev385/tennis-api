import { sequelizeClubRepo } from "../../repositories";
import { ListClubsController } from "./listClubController";
import { ListClubsUseCase } from "./listClubsUseCase";

const listClubsUseCase = new ListClubsUseCase(sequelizeClubRepo);
const listClubController = new ListClubsController(listClubsUseCase);

export {
    listClubController,
};
