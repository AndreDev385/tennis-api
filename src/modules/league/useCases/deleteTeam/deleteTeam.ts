import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Team } from "../../domain/team";
import { TeamRepository } from "../../repositories/teamRepo";
import { DeleteTeamDto } from "./deleteTeamDto";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError, Result<void>>;

export class DeleteTeam implements UseCase<DeleteTeamDto, Response> {

    private readonly teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        this.teamRepo = teamRepo;
    }

    async execute(request: DeleteTeamDto): Promise<Response> {

        let team: Team;

        try {
            try {
                team = await this.teamRepo.getById(request.teamId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            team.delete();

            await this.teamRepo.save(team);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
