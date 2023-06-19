import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserEmail } from "../../domain/email";
import { User } from "../../domain/user";
import { UserDto } from "../../dtos/userDto";
import { UserMap } from "../../mappers/userMap";
import { UserRepository } from "../../repositories/userRepo";
import { AppError } from "../../../../shared/core/AppError";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<UserDto>
>;

export class GetUserByEmailUseCase
    implements UseCase<string, Promise<Response>>
{
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async execute(email: string): Promise<Response> {
        const emailOrError = UserEmail.create(email);

        const dtoResult = Result.combine([emailOrError]);

        if (dtoResult.isFailure) {
            return left(
                Result.fail(dtoResult.getErrorValue())
            ) as Response;
        }

        try {
            let user: User;

            try {
                user = await this.repository.getUserByEmail(
                    emailOrError.getValue()
                );
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok<UserDto>(UserMap.toDto(user)));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
