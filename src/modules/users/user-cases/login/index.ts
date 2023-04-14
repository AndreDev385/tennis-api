import { LoginUseCase } from "./login-use-case";
import { userRepository } from "../../repositories";
import { LoginController } from "./login-controller";

const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);

export {
    loginUseCase,
    loginController
}
