import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserEmail } from "../../domain/email";
import { Name } from "../../domain/names";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";
import { CreateUserErrors } from "../createUser/createUserErrors";
import { EditUserRequest } from "./dto";

type Response = Either<
    | AppError.UnexpectedError
    | CreateUserErrors.EmailAlreadyExistsError
    | Result<string>,
    Result<void>
>;

export class EditUser implements UseCase<EditUserRequest, Response> {
    userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request: EditUserRequest): Promise<Response> {
        // user already in db
        let userToEdit: User;

        try {
            try {
                userToEdit = await this.userRepo.getUserByUserId(request.userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const firstNameOrError = Name.create({
                value: request.firstName,
            });

            const lastNameOrError = Name.create({
                value: request.lastName,
            });

            const emailOrError = UserEmail.create(request.email);

            const result = Result.combine([
                firstNameOrError,
                lastNameOrError,
                emailOrError,
            ]);

            if (result.isFailure) {
                return left(Result.fail<string>(result.getErrorValue()));
            }

            const firstName = firstNameOrError.getValue();
            const lastName = lastNameOrError.getValue();
            const email = emailOrError.getValue();

            if (!email.equals(userToEdit.email)) {
                try {
                    await this.userRepo.getUserByEmail(email);
                    return left(
                        new CreateUserErrors.EmailAlreadyExistsError(
                            email.value
                        )
                    );
                } catch (error) { }
            }

            userToEdit.editUser(firstName, lastName, email);

            await this.userRepo.save(userToEdit);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
