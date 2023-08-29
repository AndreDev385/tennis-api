import { createTransport } from "nodemailer";
import { EmailData, Mailer } from "./mailer";
import { environment } from "../../../../config";
import { Result } from "../../../../shared/core/Result";

export class NodeMailer implements Mailer {
    appEmail: string;
    emailPassword: string;

    constructor() {
        this.appEmail = environment.mailer.app_email;
        this.emailPassword = environment.mailer.email_password;
    }

    public sendEmail({ email, subject, text }: EmailData): Result<string> {
        const transporter = createTransport({
            host: "gmail",
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

        let result: Result<string>;

        transporter.sendMail(options, (err, info) => {
            if (err) {
                result = Result.fail(err.message)
            } else {
                result = Result.ok(info.response)
            }
        });

        transporter.close();

        return result;
    }
}
