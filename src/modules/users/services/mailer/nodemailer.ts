import { createTransport } from "nodemailer";
import { EmailData, Mailer } from "./mailer";

export class NodeMailer implements Mailer {
    appEmail: string;
    emailPassword: string;

    constructor() {
        this.appEmail = "luismar_banezca@hotmail.com";
        this.emailPassword = "04267577239";
    }

    public async sendEmail({ email, subject, text }: EmailData) {
        const transporter = createTransport({
            host: "smtp.office365.com",
            port: 587,
            auth: {
                user: this.appEmail,
                pass: this.emailPassword,
            },
        });
        const options = {
            from: this.appEmail,
            to: email,
            subject: subject,
            text: text,
        };

        try {
            await transporter.sendMail(options);
        } catch (e) {
            throw e;
        }
        transporter.close();
    }
}
