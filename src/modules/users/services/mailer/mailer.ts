import { Result } from "../../../../shared/core/Result";

export interface EmailData {
    email: string;
    subject: string;
    text: string;
}

export interface Mailer {
    sendEmail(props: EmailData): Result<string>
}
