import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserController } from "./createUserController";
import { sequelizeUserRepo } from "../../repositories";

const createUserUseCase = new CreateUserUseCase(sequelizeUserRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
