import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { LeagueDto } from "../../dtos/leagueDto";
import { LeagueRepository } from "../../repositories/leagueRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<LeagueDto>>>;

export class ListLeague implements UseCase<void, Promise<Response>> {
    repo: LeagueRepository;

    constructor(repo: LeagueRepository) {
        this.repo = repo;
    }

    async execute(): Promise<Response> {
        try {
            const list = await this.repo.list();

            return right(Result.ok(list));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
