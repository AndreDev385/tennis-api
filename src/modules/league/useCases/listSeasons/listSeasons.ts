import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { SeasonRepository } from "../../repositories/seasonRepo";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<any>>;

export class ListSeasons implements UseCase<any, any> {
    private seasonRepo: SeasonRepository;

    constructor(repo: SeasonRepository) {
        this.seasonRepo = repo;
    }
    async execute(leagueId: string): Promise<Response> {
        let list: Array<any>;
        try {

            if (!leagueId) {
                return left(Result.fail<string>("leagueId es requerido"));
            }

            list = await this.seasonRepo.listSeasonsByLeague(leagueId);

            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
