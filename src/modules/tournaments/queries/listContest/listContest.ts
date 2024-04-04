import { AppError } from "../../../../shared/core/AppError";
import { Either, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ContestDto } from "../../dtos/contestsDto";
import { ContestQuery, ContestRepository } from "../../repository/contestRepo";

type Response = Either<AppError.UnexpectedError, ContestDto[]>;

export class ListContest implements UseCase<any, Response> {
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

        try {
            for (const [k, v] of Object.entries(request)) {
                if (validQueries.includes(k as keyof ContestQuery)) {
                    query[k as keyof ContestQuery] = v as any;
                }
            }

            const contest = await this.contestRepo.list(query);

            return right(contest);
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
