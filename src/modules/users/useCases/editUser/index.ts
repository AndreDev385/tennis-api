import { sequelizeUserRepo } from "../../repositories";
import { EditUser } from "./editUser";
import { EditUserController } from "./editUserController";
import { EditUserFromAdminController } from "./editUserFromAdminController";

const editUser = new EditUser(sequelizeUserRepo);
const editUserController = new EditUserController(editUser);
const editUserFromAdminCtrl = new EditUserFromAdminController(editUser);

export { editUserController, editUserFromAdminCtrl };
