import { sequelizeUserRepo } from "../../repositories";
import { authService } from "../login";
import { AdminLogin } from "./adminLogin";
import { AdminLoginController } from "./adminLoginController";

const adminLogin = new AdminLogin(sequelizeUserRepo, authService);
const adminLoginController = new AdminLoginController(adminLogin)

export { adminLoginController };
