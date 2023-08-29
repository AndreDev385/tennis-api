import { createTransport } from "nodemailer";
import { Mailer } from "./mailer";
import { environment } from "../../../../config";

export class NodeMailer implements Mailer {
    appEmail: string;
    emailPassword: string;

    constructor() {
        this.appEmail = environment.mailer.app_email;
        this.emailPassword = environment.mailer.email_password;
    }

    public sendEmail({ email, subject, text }) {
        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
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

        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info.response)
            }
        });

        transporter.close();
    }
}
