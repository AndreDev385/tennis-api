import { createTransport } from "nodemailer";
import { EmailData, Mailer } from "./mailer";
import { environment } from "../../../../config";

export class NodeMailer implements Mailer {
    appEmail: string;
    emailPassword: string;

    constructor() {
        this.appEmail = environment.mailer.app_email;
        this.emailPassword = environment.mailer.email_password;
    }

    public async sendEmail({ email, subject, text }: EmailData) {
        const transporter = createTransport({
            host: "gmail",
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

        await transporter.sendMail(options);
        
        transporter.close();
    }
}
