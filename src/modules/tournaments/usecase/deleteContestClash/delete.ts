import { AppError } from "../../../../shared/core/AppError";
import {
    Either,
    Left,
    Result,
    left,
    right,
} from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ContestClashRepository } from "../../repository/contestClashRepo";

type Req = {
    contestClashId: string;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class DeleteContestClash implements UseCase<Req, Res> {
    private readonly repo: ContestClashRepository;

    constructor(repo: ContestClashRepository) {
        this.repo = repo;
    }

    async execute(request: Req): Promise<Res> {
        try {
            const result = await this.repo.delete({
                contestClashId: request.contestClashId,
            });

            if (result.isFailure) {
                return left(new AppError.NotFoundError(result.getErrorValue()));
            }

            return right(Result.ok());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
