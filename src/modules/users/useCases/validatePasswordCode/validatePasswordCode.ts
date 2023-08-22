import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError, Result<void>>

export class ValidatePasswordCode implements UseCase<{ code: string }, Response> {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request: { code: string; }): Promise<Response> {

        let user: User;

        try {
            try {
                user = await this.userRepo.getUserByRecoveryPasswordCode(request.code);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }
            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
