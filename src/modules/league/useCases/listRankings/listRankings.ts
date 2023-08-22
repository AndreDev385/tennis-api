import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { RankingMap } from "../../mappers/rankingMap";
import { RankingQuery } from "../../repositories/rankingRepo";
import { RankingRepository } from "../../repositories/rankingRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<any>>>;

export class ListRankings implements UseCase<any, Response> {

    private rankingsRepo: RankingRepository;

    constructor(rankingRepo: RankingRepository) {
        this.rankingsRepo = rankingRepo;
    }

    async execute(request: any): Promise<Response> {

        const query: RankingQuery = {}

        for (const [key, value] of Object.entries(request)) {
            if (key == 'teamId') {
                query[key] = value as string;
            }
            if (key == 'seasonId') {
                query[key] = value as string;
            }
            if (key == 'position') {
                query[key] = value as string;
            }
        }

        try {

            const list = await this.rankingsRepo.list(query);

            return right(Result.ok(list.map((ranking) => RankingMap.toDto(ranking))));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }

    }

}
