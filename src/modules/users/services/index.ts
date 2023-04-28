import { AuthServiceImpl } from "./auth/auth-service-impl";
import { NodeMailer } from "./mailer/nodemailer";

const authService = new AuthServiceImpl();
const mailer = new NodeMailer();

export {
    authService,
    mailer,
}
