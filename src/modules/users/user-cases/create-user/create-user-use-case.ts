import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/user-email";
import { UserPassword } from "../../domain/user-password";
import { UserRepository } from "../../repositories/user-repository";
import { CreateUserDto } from "./create-user-dto";
import { CreateUserErrors } from "./create-user-errors";

type Response = Either<
    | CreateUserErrors.EmailAlreadyExistsError
    | AppError.UnexpectedError
    | Result<any>,
    Result<void>
>;

export class CreateUserUseCase implements UseCase<CreateUserDto, Promise<Response>> {
    repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    async execute(request: CreateUserDto): Promise<Response> {
        const emailOrError = UserEmail.create(request.email);
        const passwordOrError = UserPassword.create({
            value: request.password,
        });
        const namesOrError = Guard.againstNullOrUndefinedBulk([
            { argument: request.firstName, argumentName: "nombre" },
            { argument: request.lastName, argumentName: "apellido" },
        ]);

        const dtoResult = Result.combine([
            emailOrError,
            passwordOrError,
            namesOrError,
        ]);

        if (dtoResult.isFailure) {
            return left(Result.fail<void>(dtoResult.getValue())) as Response;
        }

        const email: UserEmail = emailOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();

        try {
            const userExist = this.repository.exists(email);

            if (userExist) {
                return left(
                    new CreateUserErrors.EmailAlreadyExistsError(email.value)
                );
            }

            const userOrError = User.create({
                email,
                password,
            });

            if (userOrError.isFailure) {
                return left(
                    Result.fail<User>(userOrError.getErrorValue().toString())
                ) as Response;
            }

            const user: User = userOrError.getValue();

            this.repository.save(user);

            return right(Result.ok<void>())
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
