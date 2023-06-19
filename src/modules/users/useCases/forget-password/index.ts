import { sequelizeUserRepo } from "../../repositories";
import { mailer } from "../../services";
import { ForgetPasswordController } from "./forgetPasswordController";
import { ForgetPasswordUseCase } from "./forgetPasswordUseCase";

const forgetPasswordUseCase = new ForgetPasswordUseCase(mailer, sequelizeUserRepo);
const forgetPasswordController = new ForgetPasswordController(
    forgetPasswordUseCase
);

export { forgetPasswordUseCase, forgetPasswordController };
