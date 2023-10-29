import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClashRepository } from "../../repositories/clashRepo";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError, Result<void>>;

export class DeleteClash implements UseCase<any, Response> {

    private readonly clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(clashId: string): Promise<Response> {
        try {
            try {
                await this.clashRepo.delete(clashId);

                return right(Result.ok<void>());
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
