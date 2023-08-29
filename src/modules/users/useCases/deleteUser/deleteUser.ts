import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserRepository } from "../../repositories/userRepo";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError | Result<string>, Result<void>>

export class DeleteUser implements UseCase<string, Response> {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(userId: string): Promise<Response> {
        let user: User;

        try {
            try {
                user = await this.userRepo.getUserByUserId(userId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (user.isDeleted) {
                return left(Result.fail<string>("El usuario ya se encuentra eliminado"))
            }

            if (user.isPlayer) {
                user.delete();
                await this.userRepo.save(user);
            } else {
                await this.userRepo.delete(user.userId.id.toString());
            }

            return right(Result.ok<void>())
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
