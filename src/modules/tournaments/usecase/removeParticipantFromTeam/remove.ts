import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { ContestTeam } from "../../domain/contestTeam";
import { ParticipantId } from "../../domain/participantId";
import { ContestTeamRepository } from "../../repository/contestTeamRepo";

type Req = {
    contestTeamId: string;
    participantId: string;
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class RemoveParticipantFromTeam implements UseCase<Req, Res> {
    private readonly repo: ContestTeamRepository;

    constructor(repo: ContestTeamRepository) {
        this.repo = repo;
    }

    async execute(request: Req): Promise<Res> {
        let team: ContestTeam;

        try {
            const maybeTeam = await this.repo.get({
                contestTeamId: request.contestTeamId,
            });

            if (maybeTeam.isFailure) {
                return left(
                    new AppError.NotFoundError(maybeTeam.getErrorValue())
                );
            }

            team = maybeTeam.getValue();

            team.removeParticipantsIds([
                ParticipantId.create(
                    new UniqueEntityID(request.participantId)
                ).getValue(),
            ]);

            await this.repo.save(team);

            return right(Result.ok())
        } catch (e) {
            return left(new AppError.UnexpectedError(e));
        }
    }
}
