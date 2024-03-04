import { sequelizeUserRepo } from "../../repositories";
import { DeleteUser } from "./deleteUser";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserFromAdmin } from "./deleteUserFromAdmin";

const deleteUser = new DeleteUser(sequelizeUserRepo);
const deleteUserController = new DeleteUserController(deleteUser);
const deleteUserFromAdminController = new DeleteUserFromAdmin(deleteUser);

export { deleteUserController, deleteUserFromAdminController }
