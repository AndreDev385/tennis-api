import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { UserEmail } from '../../domain/email';
import { UserRepository } from '../../repositories/userRepo';
import { Mailer } from '../../services/mailer/mailer';
import { ForgetPasswordDto } from './forgetPasswordDto';
import { ForgetPasswordErrors } from './forgetPasswordErrors';

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordDto, Response> {
    private mailer: Mailer;
    private repository: UserRepository;

    constructor(mailer: Mailer, repository: UserRepository) {
        this.mailer = mailer;
        this.repository = repository;
    }

    async execute(request: ForgetPasswordDto): Promise<Response> {
        const emailOrError = UserEmail.create(request.email);

        if (emailOrError.isFailure) {
            return left(
                Result.fail<string>(`${emailOrError.getErrorValue().value}`)
            );
        }

        const email: UserEmail = emailOrError.getValue();

        try {
            const user = await this.repository.getUserByEmail(email);

            if (!user) {
                return left(
                    new ForgetPasswordErrors.EmailDoesNotExist(request.email)
                );
            }

            user.generateCode();

            const mailOptions = {
                email: request.email,
                subject: 'Cambiar contraseña',
                text: `Estimado ${user.firstName.value} ${user.lastName.value},

Le informamos que ha recibido este correo debido a la solicitud de cambio de contraseña que usted ha solicitado en GameMind. Para asegurarnos de que su cuenta está protegida y que solo usted tiene acceso a ella, hemos generado un código de verificación único.

Codigo: ${user.recoverPasswordCode}

Para completar el proceso de cambio de contraseña y asegurar la seguridad de su cuenta, le pedimos que ingrese el código de verificación proporcionado en su cuenta de GameMind. Si no ha solicitado este cambio de clave, ignore este correo.

En GameMind, nos comprometemos a garantizar la privacidad y seguridad de nuestros usuarios. Agradecemos su confianza en nosotros y nos esforzamos por ofrecerle la mejor experiencia posible.

Saludos cordiales,
El equipo de GameMind`,
            }

            this.mailer.sendEmail(mailOptions);

            await this.repository.save(user);

            return right(Result.ok<void>());
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
