import { CreateUserUseCase } from "./create-user-use-case";
import { CreateUserController } from "./create-user-controller";
import { userRepository } from "../../repositories/";

const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(
  createUserUseCase
)

export {
  createUserUseCase,
  createUserController
}

