import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Match } from "../../domain/match";
import { MatchDto } from "../../dtos/matchDto";
import { MatchMap } from "../../mappers/matchMap";
import { MatchRepository } from "../../repositories/matchRepo";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<MatchDto>
>;

export class GetMatchById implements UseCase<string, Response> {
    matchRepo: MatchRepository;

    constructor(matchRepo: MatchRepository) {
        this.matchRepo = matchRepo;
    }

    async execute(matchId: string): Promise<Response> {
        let match: Match;

        try {
            try {
                match = await this.matchRepo.getMatchById(matchId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok(MatchMap.toDto(match)));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
