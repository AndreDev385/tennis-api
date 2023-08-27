import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/email";
import { FirstName, LastName } from "../../domain/names";
import { UserPassword } from "../../domain/password";
import { UserRepository } from "../../repositories/userRepo";
import { CreateUserDto } from "./createUserDto";
import { CreateUserErrors } from "./createUserErrors";

type Response = Either<
    | CreateUserErrors.EmailAlreadyExistsError
    | AppError.UnexpectedError
    | Result<string>,
    Result<void>
>;

export class CreateUserUseCase
    implements UseCase<CreateUserDto, Promise<Response>>
{
    private repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    async execute(request: CreateUserDto): Promise<Response> {
        const firstNameOrError = FirstName.create({ value: request.firstName });
        const lastNameOrError = LastName.create({ value: request.lastName });
        const emailOrError = UserEmail.create(request.email);
        const passwordOrError = UserPassword.create({
            value: request.password,
        });

        const dtoResult = Result.combine([
            firstNameOrError,
            lastNameOrError,
            emailOrError,
            passwordOrError,
        ]);

        if (dtoResult.isFailure) {
            return left(
                Result.fail<string>(dtoResult.getErrorValue())
            ) as Response;
        }

        const firstName: FirstName = firstNameOrError.getValue();
        const lastName: LastName = lastNameOrError.getValue();
        const email: UserEmail = emailOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();

        try {
            const userExist = await this.repository.exists(email);

            if (userExist) {
                return left(
                    new CreateUserErrors.EmailAlreadyExistsError(email.value)
                );
            }

            const userOrError = User.create({
                firstName,
                lastName,
                email,
                password,
                canTrack: request.canTrack ?? false,
            });

            if (userOrError.isFailure) {
                return left(
                    Result.fail<string>(`${userOrError.getErrorValue()}`)
                ) as Response;
            }

            const user: User = userOrError.getValue();

            this.repository.save(user);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
