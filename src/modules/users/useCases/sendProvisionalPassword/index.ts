import { sequelizeUserRepo } from "../../repositories";
import { mailer } from "../../services";
import { SendProvisionalPassword } from "./sendProvisionalPassword";

const sendProvisionalPassword = new SendProvisionalPassword(sequelizeUserRepo, mailer)

export { sendProvisionalPassword }
