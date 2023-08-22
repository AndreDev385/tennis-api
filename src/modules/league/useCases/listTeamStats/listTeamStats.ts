import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { StatsDto } from "../../dtos/statsTeamDto";
import { TeamStatsMap } from "../../mappers/teamStatsMap";
import { TeamStatsQuery, TeamStatsRepository } from "../../repositories/teamStatsRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<StatsDto>>>;

export class ListTeamStats implements UseCase<any, Response> {

    repo: TeamStatsRepository;

    constructor(repo: TeamStatsRepository) {
        this.repo = repo;
    }

    async execute(request: any): Promise<Response> {
        try {
            const query: TeamStatsQuery = {};

            for (const [key, value] of Object.entries(request)) {
                if (key == "teamId") {
                    query.teamId = value as string;
                }
                if (key == "seasonId") {
                    query.seasonId = value as string;
                }
                if (key == "journey") {
                    query.journey = value as string;
                }
            }

            const list = await this.repo.list(query);

            return right(Result.ok(list.map((stats) => TeamStatsMap.toDto(stats))))

        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
