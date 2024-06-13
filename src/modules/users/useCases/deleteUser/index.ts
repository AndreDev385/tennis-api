import { sequelizeParticipantRepo } from "../../../tournaments/repository";
import { sequelizeUserRepo } from "../../repositories";
import { DeleteUser } from "./deleteUser";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserFromAdmin } from "./deleteUserFromAdmin";

const deleteUser = new DeleteUser(sequelizeUserRepo, sequelizeParticipantRepo);
const deleteUserController = new DeleteUserController(deleteUser);
const deleteUserFromAdminController = new DeleteUserFromAdmin(deleteUser);

export { deleteUserController, deleteUserFromAdminController }
