import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TournamentRepository } from "../../repository/tournamentRepo";

type Request = {
    tournamentId: string;
}

type Response = Either<AppError.NotFoundError | AppError.UnexpectedError, Result<void>>;

export class DeleteTournament implements UseCase<Request, Response> {

    private tournamentRepo: TournamentRepository;

    constructor(repo: TournamentRepository) {
        this.tournamentRepo = repo;
    }

    async execute(request: Request): Promise<Response> {
        try {

            try {
                await this.tournamentRepo.get({ tournamentId: request.tournamentId });
            } catch (e) {
                return left(new AppError.NotFoundError(e));
            }

            await this.tournamentRepo.delete(request.tournamentId);

            return right(Result.ok());
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
