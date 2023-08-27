import { sequelizeUserRepo } from "../../repositories";
import { ChangeForgottenPassword } from "./changeForgottenPassword";
import { ChangeForgotterPasswordController } from "./changeForgottenPasswordController";
import { ChangePassword } from "./changePassword";
import { ChangePasswordController } from "./changePasswordController";

const changePassword = new ChangePassword(sequelizeUserRepo);
const changeForgottenPassword = new ChangeForgottenPassword(sequelizeUserRepo);

const changeForgottenPasswordController = new ChangeForgotterPasswordController(
    changeForgottenPassword
);
const changePasswordController = new ChangePasswordController(changePassword);

export { changeForgottenPasswordController, changePasswordController };
