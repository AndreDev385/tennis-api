import { sequelizeClubRepo } from "../../repositories";
import { ListClubsController } from "./listClubController";
import { ListClubs } from "./listClubsUseCase";

const listClubsUseCase = new ListClubs(sequelizeClubRepo);
const listClubController = new ListClubsController(listClubsUseCase);

export {
    listClubController,
};
