import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TournamentMatchMap } from "../../mapper/TournamentMatchMap";
import { TournamentMatchQuery, TournamentMatchRepo } from "../../repository/tournamentMatchRepo";

type Response = Either<AppError.UnexpectedError, Result<any>>;

export class GetTournamentMatch implements UseCase<any, Response> {

    private readonly matchRepo: TournamentMatchRepo;

    constructor(matchRepo: TournamentMatchRepo) {
        this.matchRepo = matchRepo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const validQueries: Array<keyof TournamentMatchQuery> = [
                "contestId",
                "tournamentId",
                "matchId",
            ];

            const query: TournamentMatchQuery = {};

            for (const [k, v] of Object.entries(request)) {
                if (validQueries.includes(k as keyof TournamentMatchQuery)) {
                    query[k as keyof TournamentMatchQuery] = v as any;
                }
            }

            const result = await this.matchRepo.get(query);

            if (result.isFailure) {
                return left(new AppError.NotFoundError(`${result.getErrorValue()}`));
            }

            return right(Result.ok(TournamentMatchMap.toDto(result.getValue())));
        } catch (error) {
            return left(new AppError.UnexpectedError(error))
        }
    }

}
