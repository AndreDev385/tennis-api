import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { MatchDto } from "../../dtos/matchDto";
import { MatchMap } from "../../mappers/matchMap";
import { MatchQuery, MatchRepository } from "../../repositories/matchRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<MatchDto>>>;

export class ListMatchs implements UseCase<any, Response> {
    matchRepo: MatchRepository;

    constructor(matchRepo: MatchRepository) {
        this.matchRepo = matchRepo;
    }

    async execute(request?: any): Promise<Response> {
        try {
            const query: MatchQuery = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "clashId") {
                    query.clashId = value as string;
                }
                if (key == "isFinish") {
                    query.isFinish = value as boolean;
                }
                if (key == "isPaused") {
                    query.isPaused = value as boolean;
                }
            }

            const domainList = await this.matchRepo.list(query);

            const dtoList = domainList.map((match) => MatchMap.toDto(match));

            return right(Result.ok<Array<MatchDto>>(dtoList));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
