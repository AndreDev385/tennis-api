import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TeamDto } from "../../dtos/teamDto";
import { TeamMap } from "../../mappers/teamMap";
import { TeamQuery, TeamRepository } from "../../repositories/teamRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<TeamDto>>>

export class ListTeams implements UseCase<any, any> {

    private teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        this.teamRepo = teamRepo;
    }

    async execute(request: any): Promise<Response> {

        const query: TeamQuery = {}

        for (const [key, value] of Object.entries(request)) {
            if (key == "teamId") {
                query[key] = value as string;
            }
            if (key == "name") {
                query[key] = value as string;
            }
            if (key == "clubId") {
                query[key] = value as string;
            }
        }

        try {
            const list = await this.teamRepo.list(request);

            return right(Result.ok(list.map((t) => TeamMap.toDto(t))))
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
