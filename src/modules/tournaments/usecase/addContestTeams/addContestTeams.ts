import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { GameMode } from "../../../league/domain/gameMode";
import { Contest } from "../../domain/contest";
import { ContestTeam } from "../../domain/contestTeam";
import { Inscribed } from "../../domain/inscribed";
import { ParticipantsIds } from "../../domain/participantsIds";
import { ContestRepository } from "../../repository/contestRepo";
import { ContestTeamRepository } from "../../repository/contestTeamRepo";

type Req = {
    contestId: string;
    teams: {
        name: string;
        position: number | null;
    }[];
};

type Res = Either<
    AppError.UnexpectedError | AppError.NotFoundError | Result<string>,
    Result<string[]>
>;

export class AddContestTeams implements UseCase<Req, Res> {
    private readonly contestTeamRepo: ContestTeamRepository;
    private readonly contestRepo: ContestRepository;

    constructor(ctr: ContestTeamRepository, cr: ContestRepository) {
        this.contestTeamRepo = ctr;
        this.contestRepo = cr;
    }

    async execute(request: Req): Promise<Res> {
        let contest: Contest;

        let errors: string[] = [];
        let inscribed: Inscribed[] = [];

        try {
            try {
                contest = await this.contestRepo.get({
                    contestId: request.contestId,
                });
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            if (contest.mode.value != GameMode.team) {
                return left(
                    Result.fail<string>("Esta competencia no es en equipos")
                );
            }

            for (const team of request.teams) {
                const maybeContestTeam = ContestTeam.create({
                    contestId: contest.contestId,
                    name: team.name,
                    participantsIds: ParticipantsIds.create([]),
                });

                if (maybeContestTeam.isFailure) {
                    return left(
                        Result.fail<string>(
                            `${maybeContestTeam.getErrorValue()}`
                        )
                    );
                }
                const t = maybeContestTeam.getValue();

                const maybeTeamExist = await this.contestTeamRepo.get({
                    contestId: contest.contestId.id.toString(),
                    name: t.name,
                })

                if (maybeTeamExist.isSuccess) {
                    errors.push(`El equipo ${team.name} ya se encuentra registrado`);
                    continue;
                }

                // save team
                const result = await this.contestTeamRepo.save(t);

                if (result.isFailure) {
                    errors.push(`Error al registrar al equipo ${team.name}`);
                    continue;
                }

                inscribed.push(
                    Inscribed.create({
                        position: team.position,
                        team: t,
                    }).getValue()
                );
            }

            contest.inscribe(inscribed);

            await this.contestRepo.save(contest);

            return right(Result.ok(errors));
        } catch (error) {
            return left(new AppError.NotFoundError(error));
        }
    }
}
