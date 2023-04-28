import { userRepository } from "../../repositories";
import { mailer } from "../../services";
import { ForgetPasswordController } from "./forget-password-controller";
import { ForgetPasswordUseCase } from "./forget-password-use-case";

const forgetPasswordUseCase = new ForgetPasswordUseCase(mailer, userRepository);
const forgetPasswordController = new ForgetPasswordController(
    forgetPasswordUseCase
);

export { forgetPasswordUseCase, forgetPasswordController };
