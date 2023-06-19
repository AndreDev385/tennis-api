import { AuthServiceImpl } from "./auth/authServiceImpl";
import { NodeMailer } from "./mailer/nodemailer";

const authService = new AuthServiceImpl();
const mailer = new NodeMailer();

export {
    authService,
    mailer,
}
