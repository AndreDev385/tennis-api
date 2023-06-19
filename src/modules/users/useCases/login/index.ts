import { LoginUseCase } from "./loginUseCase";
import { sequelizeUserRepo } from "../../repositories";
import { LoginController } from "./loginController";
import { authService } from "../../services";

const loginUseCase = new LoginUseCase(sequelizeUserRepo, authService);
const loginController = new LoginController(loginUseCase);

export {
    authService,
    loginUseCase,
    loginController
}
