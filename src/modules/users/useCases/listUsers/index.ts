import { sequelizeUserRepo } from "../../repositories";
import { ListUserController } from "./listUserController";
import { ListUsers } from "./listUsers";

const listUser = new ListUsers(sequelizeUserRepo);

const listUserController = new ListUserController(listUser);

export { listUserController };
