import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserPassword } from "../../domain/password";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";
import { ChangePasswordRequest } from "./dto";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<void>
>;

export class ChangePassword implements UseCase<any, Response> {
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request: ChangePasswordRequest): Promise<Response> {
        let user: User;

        try {
            try {
                user = await this.userRepo.getUserByUserId(request.userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            const passwordOrError = UserPassword.create({
                value: request.newPassword,
            });

            if (passwordOrError.isFailure) {
                return left(Result.fail<string>("Clave invalida"));
            }

            user.changePassword(passwordOrError.getValue());

            await this.userRepo.save(user);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
