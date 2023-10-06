import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { PausedMatch } from "../../domain/pausedMatch";
import { PausedMatchMap } from "../../mappers/pausedMatchMap";
import { PausedMatchRepository } from "../../repositories/pausedMatchRepo";
import { GetPausedMatchRequest } from "./dto";

type Response = Either<AppError.NotFoundError | AppError.UnexpectedError, Result<any>>;

export class GetPausedMatch implements UseCase<GetPausedMatchRequest, Response> {

    private readonly pausedMatchRepo: PausedMatchRepository;

    constructor(pausedMatchRepo: PausedMatchRepository) {
        this.pausedMatchRepo = pausedMatchRepo;
    }

    async execute(request: GetPausedMatchRequest): Promise<Response> {
        let pausedMatch: PausedMatch;
        try {
            try {
                pausedMatch = await this.pausedMatchRepo.getByMatchId(request.matchId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            console.log(pausedMatch);

            return right(Result.ok(PausedMatchMap.toDto(pausedMatch)));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
