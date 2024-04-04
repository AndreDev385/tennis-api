import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserEmail } from "../../domain/email";
import { JWTToken } from "../../domain/jwt";
import { UserPassword } from "../../domain/password";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";
import { AuthService } from "../../services/auth/authService";
import { LoginDto } from "../login/loginDto";
import { LoginUseCaseErrors } from "../login/loginErrors";

type Response = Either<
    | AppError.UnexpectedError
    | LoginUseCaseErrors.EmailDoesNotExist
    | LoginUseCaseErrors.PasswordDoesntMatchError
    | Result<string>,
    Result<any>
>;

export class AdminLogin implements UseCase<LoginDto, Response> {
    private repository: UserRepository;
    private authService: AuthService;

    constructor(repository: UserRepository, authService: AuthService) {
        this.repository = repository;
        this.authService = authService;
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

        let user: User;

        try {
            try {
                user = await this.repository.getUserByEmail(email);
            } catch (error) {
                return left(new LoginUseCaseErrors.EmailDoesNotExist());
            }

            const validPassword = await user.password!.comparePassword(
                password.value
            );

            if (!validPassword) {
                return left(new LoginUseCaseErrors.PasswordDoesntMatchError());
            }

            if (!user.isAdmin) {
                return left(Result.fail<string>("No autorizado"));
            }

            try {
                const accessToken: JWTToken = this.authService.signJWT({
                    userId: user.id.toString(),
                    firstName: user.firstName.value,
                    lastName: user.lastName.value,
                    email: user.email?.value ?? null,
                    ci: user.ci?.value ?? null,
                    canTrack: user.canTrack,
                    isAdmin: user.isAdmin,
                    isPlayer: user.isPlayer,
                });

                user.setAccessToken(accessToken);
            } catch (error) {
                return left(new AppError.UnexpectedError(error));
            }

            await this.repository.save(user);

            return right(Result.ok(user.accessToken));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
