import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserDto } from "../../dtos/userDto";
import { UserMap } from "../../mappers/userMap";
import { UserQuery, UserRepository } from "../../repositories/userRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<UserDto>>>

export class ListUsers implements UseCase<any, Response> {
    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(request?: any): Promise<Response> {
        try {
            const query: UserQuery = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "isAdmin") {
                    if (value === 'true') query.isAdmin = true;
                    else query.isAdmin = false;
                }
                if (key == "canTrack") {
                    if (value === 'true') query.canTrack = true;
                    else query.canTrack = false;
                }
            }

            const list = await this.userRepo.list(query);

            return right(Result.ok(list.map((user) => UserMap.toDto(user))));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
