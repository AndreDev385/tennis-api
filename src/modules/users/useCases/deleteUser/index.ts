import { sequelizeUserRepo } from "../../repositories";
import { DeleteUser } from "./deleteUser";
import { DeleteUserController } from "./deleteUserController";

const deleteUser = new DeleteUser(sequelizeUserRepo);
const deleteUserController = new DeleteUserController(deleteUser);

export { deleteUserController }
