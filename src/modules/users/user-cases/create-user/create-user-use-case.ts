import { AppError } from "../../../../shared/core/AppError";
import { Guard } from "../../../../shared/core/Guard";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/user-email";
import { FirstName, LastName } from "../../domain/user-names";
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
        const firstNameOrError = FirstName.create({ value: request.firstName})
        const lastNameOrError = LastName.create({ value: request.lastName})
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

        console.log(dtoResult, 'result')

        if (dtoResult.isFailure) {
            return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
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
