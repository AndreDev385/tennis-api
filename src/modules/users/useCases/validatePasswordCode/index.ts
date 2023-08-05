import { sequelizeUserRepo } from "../../repositories";
import { ValidatePasswordCode } from "./validatePasswordCode";
import { ValidatePasswordCodeController } from "./validatePasswordCodeController";

const validatePasswordCode = new ValidatePasswordCode(sequelizeUserRepo);
const validatePasswordCodeController = new ValidatePasswordCodeController(validatePasswordCode);

export { validatePasswordCodeController };
