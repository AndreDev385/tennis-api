import { LoginUseCase } from "./login-use-case";
import { userRepository } from "../../repositories";
import { LoginController } from "./login-controller";
import { authService } from "../../services";

const loginUseCase = new LoginUseCase(userRepository, authService);
const loginController = new LoginController(loginUseCase);

export {
    authService,
    loginUseCase,
    loginController
}
