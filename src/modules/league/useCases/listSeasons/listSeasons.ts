import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { SeasonQuery, SeasonRepository } from "../../repositories/seasonRepo";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<any>>;

export class ListSeasons implements UseCase<any, any> {
    private seasonRepo: SeasonRepository;

    constructor(repo: SeasonRepository) {
        this.seasonRepo = repo;
    }
    async execute(query: SeasonQuery): Promise<Response> {
        try {
            const list = await this.seasonRepo.list(query);

            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
