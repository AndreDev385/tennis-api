import { sequelizeUserRepo } from "../../repositories";
import { EditUser } from "./editUser";
import { EditUserController } from "./editUserController";

const editUser = new EditUser(sequelizeUserRepo);
const editUserController = new EditUserController(editUser);

export { editUserController }
