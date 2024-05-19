import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TournamentAdRepository } from "../../repository/tournamentAdRepo";

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

type Req = { image: string };

export class DeleteTournamentAd implements UseCase<Req, Res> {
    private readonly repo: TournamentAdRepository;

    constructor(repo: TournamentAdRepository) {
        this.repo = repo;
    }
    async execute({ image }: Req): Promise<Res> {
        const result = await this.repo.delete(image);

        if (result.isFailure) {
            return left(new AppError.NotFoundError(result.getErrorValue()));
        }

        return right(Result.ok());
    }
}
