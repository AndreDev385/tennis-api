import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/email";
import { Name } from "../../domain/names";
import { UserPassword } from "../../domain/password";
import { UserRepository } from "../../repositories/userRepo";
import { CreateUserDto } from "./createUserDto";
import { CreateUserErrors } from "./createUserErrors";
import { CI } from "../../domain/ci";

type Response = Either<
    | CreateUserErrors.EmailAlreadyExistsError
    | AppError.UnexpectedError
    | Result<string>,
    Result<void>
>;

type StandartUserData = {
    firstName: Name,
    lastName: Name,
    email: UserEmail,
    password: UserPassword,
}

type CreateTracker = StandartUserData & {
    canTrack: boolean,
}

type UserData = StandartUserData & {
    ci: CI,
}

export class CreateUserUseCase
    implements UseCase<CreateUserDto, Promise<Response>>
{
    private repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    }

    private async createUser(data: UserData): Promise<Either<Result<string>, Result<void>>> {
        try {
            const userRegisteredByAdmin = await this.repository.get({ ci: data.ci.value });

            if (userRegisteredByAdmin.email == null && userRegisteredByAdmin.password == null) {
                // update user
                userRegisteredByAdmin.editUser(
                    userRegisteredByAdmin.firstName,
                    userRegisteredByAdmin.lastName,
                    data.email,
                    data.ci,
                )

                userRegisteredByAdmin.changePassword(data.password);

                await this.repository.save(userRegisteredByAdmin);
                return right(Result.ok<void>());
            }

            return left(Result.fail<string>(`CI: ${data.ci.value} ya se encuentra registrada`))
        } catch (e) { }

        const userOrError = User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            email: data.email,
            password: data.password,
        });

        if (userOrError.isFailure) {
            return left(
                Result.fail<string>(`${userOrError.getErrorValue()}`)
            )
        }

        const user: User = userOrError.getValue();

        await this.repository.save(user);

        return right(Result.ok<void>());
    }

    private async createTracker(data: CreateTracker): Promise<Either<Result<string>, Result<void>>> {
        const userOrError = User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            canTrack: data.canTrack,
        });

        if (userOrError.isFailure) {
            return left(
                Result.fail<string>(`${userOrError.getErrorValue()}`)
            )
        }

        const user: User = userOrError.getValue();

        await this.repository.save(user);

        return right(Result.ok<void>());
    }

    async execute(request: CreateUserDto): Promise<Response> {
        const firstNameOrError = Name.create({ value: request.firstName });
        const lastNameOrError = Name.create({ value: request.lastName });
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

        const firstName: Name = firstNameOrError.getValue();
        const lastName: Name = lastNameOrError.getValue();
        const email: UserEmail = emailOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();

        const emailAlreadyTaken = await this.repository.exists(email);

        if (emailAlreadyTaken) {
            return left(
                new CreateUserErrors.EmailAlreadyExistsError(email.value)
            );
        }

        if (request.canTrack) {
            return this.createTracker({
                firstName,
                lastName,
                email,
                password,
                canTrack: request.canTrack,
            });
        }

        const ciOrError = CI.create({ value: request.ci! });

        if (ciOrError.isFailure) {
            return left(Result.fail<string>(`${ciOrError.getErrorValue()}`));
        }

        const ci = ciOrError.getValue();

        return await this.createUser({
            firstName,
            lastName,
            email,
            password,
            ci
        })
    }
}
