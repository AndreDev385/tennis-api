import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserController } from "./createUserController";
import { sequelizeUserRepo } from "../../repositories";
import { CreateTrackerController } from "./createTrackerController";

const createUserUseCase = new CreateUserUseCase(sequelizeUserRepo);
const createUserController = new CreateUserController(createUserUseCase);
const createTrackerController = new CreateTrackerController(createUserUseCase);

export { createUserUseCase, createUserController, createTrackerController };
