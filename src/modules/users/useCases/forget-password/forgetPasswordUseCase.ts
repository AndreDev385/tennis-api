import { AppError } from '../../../../shared/core/AppError';
import { Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { UserEmail } from '../../domain/email';
import { UserRepository } from '../../repositories/userRepo';
import { Mailer } from '../../services/mailer/mailer';
import { ForgetPasswordDto } from './forgetPasswordDto';
import { ForgetPasswordErrors } from './forgetPasswordErrors';

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordDto, any> {
	private mailer: Mailer;
	private repository: UserRepository;

	constructor(mailer: Mailer, repository: UserRepository) {
		this.mailer = mailer;
		this.repository = repository;
	}

	async execute(request: ForgetPasswordDto) {
		const emailOrError = UserEmail.create(request.email);

		if (emailOrError.isFailure) {
			return left(
				Result.fail<UserEmail>(emailOrError.getErrorValue().value)
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

			await this.repository.save(user);

			this.mailer.sendEmail({
				email: request.email,
				subject: 'Cambiar contrase#a',
				text: `Codigo: ${user.recoverPasswordCode}`,
			});

			return right(Result.ok<void>());
		} catch (e) {
			return left(new AppError.UnexpectedError(e));
		}
	}
}
