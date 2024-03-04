import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserEmail } from "../../domain/email";
import { UserRepository } from "../../repositories/userRepo";
import { Mailer } from "../../services/mailer/mailer";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class SendProvisionalPassword
    implements UseCase<{ email: string; password: string }, Response>
{
    private mailer: Mailer;
    private readonly repository: UserRepository;

    constructor(repo: UserRepository, mailer: Mailer) {
        this.mailer = mailer;
        this.repository = repo;
    }

    async execute(request: {
        email: string;
        password: string;
    }): Promise<Response> {
        const emailResult = UserEmail.create(request.email);

        if (emailResult.isFailure) {
            return left(
                Result.fail<string>(`${emailResult.getErrorValue().value}`)
            );
        }

        const email: UserEmail = emailResult.getValue();

        try {
            const user = await this.repository.getUserByEmail(email);

            const mailOptions = {
                email: request.email,
                subject: "Contraseña provisional",
                text: `Estimado ${user.firstName.value} ${user.lastName.value}.\n
Le informamos que hemos configurado su contraseña de acceso a la aplicación GameMind. Su nueva contraseña es:

${request.password}

Puede usar esta contraseña para iniciar sesión en la aplicación GameMind en cualquier momento.
Atentamente, Equipo de GameMind`,
            };

            this.mailer.sendEmail(mailOptions);

            await this.repository.save(user);

            return right(Result.ok<void>());
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
