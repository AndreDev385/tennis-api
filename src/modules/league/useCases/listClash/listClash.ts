import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ClashRepository } from "../../repositories/clashRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class ListClash implements UseCase<any, Promise<Response>> {
    clashRepo: ClashRepository;

    constructor(clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
    }

    async execute(request?: any): Promise<Response> {
        try {
            const list = await this.clashRepo.list(request);

            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
