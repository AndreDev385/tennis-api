import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { CategoryMap } from "../../../league/mappers/categoryMap";
import { Contest } from "../../domain/contest";
import { ContestMap } from "../../mapper/ContestMap";
import { CoupleMap } from "../../mapper/CoupleMap";
import { ParticipantMap } from "../../mapper/ParticipantMap";
import { ContestQuery, ContestRepository } from "../../repository/contestRepo";

type Response = Either<AppError.UnexpectedError, any>;

export class GetContest implements UseCase<any, Response> {
    private readonly contestRepo: ContestRepository;

    constructor(repo: ContestRepository) {
        this.contestRepo = repo;
    }

    async execute(request: any): Promise<Response> {
        const validQueries: Array<keyof ContestQuery> = [
            "contestId",
            "tournamentId",
        ];

        const query: ContestQuery = {};

        let contest: Contest;

        try {
            for (const [k, v] of Object.entries(request)) {
                if (validQueries.includes(k as keyof ContestQuery)) {
                    query[k as keyof ContestQuery] = v as any;
                }
            }

            try {
                contest = await this.contestRepo.get(query);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(ContestMap.toDto(contest));
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
