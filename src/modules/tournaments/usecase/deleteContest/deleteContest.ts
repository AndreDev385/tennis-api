import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ContestRepository } from "../../repository/contestRepo";

type Req = {
    contestId: string;
}

type Res = Either<AppError.UnexpectedError | AppError.NotFoundError, Result<void>>

export class DeleteContest implements UseCase<Req, Res> {
    private readonly repo: ContestRepository;

    constructor(repo: ContestRepository) {
        this.repo = repo;
    }

    async execute(request: Req): Promise<Res> {
        try {
            try {
                await this.repo.get({ contestId: request.contestId });
            } catch (e) {
                return left(new AppError.NotFoundError(e));
            }
            await this.repo.delete(request.contestId);

            return right(Result.ok());
        } catch (e) {
            return left(new AppError.UnexpectedError(e))
        }
    }

}
