import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { JWTToken } from "../../domain/jwt";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/user-email";
import { UserPassword } from "../../domain/user-password";
import { UserRepository } from "../../repositories/user-repository";
import { LoginDto } from "./login-dto";
import { LoginUseCaseErrors } from "./login-errors";
import { AppError } from "../../../../shared/core/AppError";
import { AuthService } from "../../services/auth/auth-service";

type Response = Either<
    | AppError.UnexpectedError
    | LoginUseCaseErrors.EmailDoesNotExist
    | LoginUseCaseErrors.PasswordDoesntMatchError
    | Result<string>,
    Result<any>
>;

export class LoginUseCase implements UseCase<LoginDto, Response> {
    private repository: UserRepository;
    private authService: AuthService

    constructor(repository: UserRepository, authService: AuthService) {
        this.repository = repository;
        this.authService = authService
    }

    async execute(request: LoginDto): Promise<Response> {
        const emailOrError = UserEmail.create(request.email);
        const passwordOrError = UserPassword.create({
            value: request.password,
        });

        const result = Result.combine([emailOrError, passwordOrError]);

        if (result.isFailure) {
            return left(Result.fail<any>(result.getErrorValue()));
        }

        const email: UserEmail = emailOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();

        const user: User = await this.repository.getUserByEmail(email);

        if (!user) {
            return left(new LoginUseCaseErrors.EmailDoesNotExist());
        }

        const validPassword = await user.password.comparePassword(
            password.value
        );

        if (!validPassword) {
            return left(new LoginUseCaseErrors.PasswordDoesntMatchError());
        }

        try {
            const accessToken: JWTToken = this.authService.signJWT({
                userId: user.id.toString(),
                firstName: user.firstName.value,
                lastName: user.lastName.value,
                isAdmin: user.isAdminUser,
            })

            user.setAccessToken(accessToken);
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }

        await this.repository.save(user);

        return right(Result.ok(user.accessToken));
    }
}
