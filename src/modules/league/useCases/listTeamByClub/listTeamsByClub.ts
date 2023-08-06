import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { TeamDto } from "../../dtos/teamDto";
import { TeamMap } from "../../mappers/teamMap";
import { TeamRepository } from "../../repositories/teamRepo";

type Response = Either<AppError.UnexpectedError, Result<Array<TeamDto>>>

export class ListTeamsByClub implements UseCase<string, Response> {

    private teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        this.teamRepo = teamRepo;
    }

    async execute(request: string): Promise<Response> {
        try {
            const list = await this.teamRepo.listByClubId(request);

            return right(Result.ok(list.map((t) => TeamMap.toDto(t))))
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
