import { sequelizeUserRepo } from "../../repositories";
import { GetUserByEmailUseCase } from "./getUserByEmail";
import { GetUserByEmailController } from "./getUserController";

const getUserByEmailUseCase = new GetUserByEmailUseCase(sequelizeUserRepo)
const getUserByEmailController = new GetUserByEmailController(getUserByEmailUseCase);

export {
    getUserByEmailController
}

