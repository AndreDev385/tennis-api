import { sequelizeUserRepo } from "../../repositories";
import { GetUserByEmailUseCase } from "./getUserByEmail";
import { GetUserByEmailWithToken } from "./getUserByEmailWithToken";
import { GetUserByEmailController } from "./getUserController";

const getUserByEmail = new GetUserByEmailUseCase(sequelizeUserRepo);
const getUserByEmailController = new GetUserByEmailController(getUserByEmail);
const getUserByEmailWithToken = new GetUserByEmailWithToken(getUserByEmail);

export { getUserByEmailController, getUserByEmailWithToken };
