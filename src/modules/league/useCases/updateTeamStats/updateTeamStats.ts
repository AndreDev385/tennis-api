import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { TeamStats, calculateTeamStats } from "../../domain/teamStats";
import { ClashRepository } from "../../repositories/clashRepo";
import { TeamStatsRepository } from "../../repositories/teamStatsRepo";
import { UpdateTeamStatsRequest } from "./dtos";

type Response = Either<
    AppError.UnexpectedError | AppError.NotFoundError,
    Result<void>
>;

export class UpdateTeamStats implements UseCase<any, any> {
    private teamStatsRepo: TeamStatsRepository;
    private clashRepo: ClashRepository;

    constructor(
        teamStatsRepo: TeamStatsRepository,
        clashRepo: ClashRepository
    ) {
        this.clashRepo = clashRepo;
        this.teamStatsRepo = teamStatsRepo;
    }

    async execute(req: UpdateTeamStatsRequest): Promise<Response> {
        let clashes: Array<Clash>;
        let clash: Clash;
        let teamStats: TeamStats;
        try {
            try {
                clash = await this.clashRepo.getClashById(req.clashId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            clashes = await this.clashRepo.list({
                team1: clash.team1.id.toString(),
                seasonId: clash.seasonId.id.toString(),
            });

            try {
                teamStats = await this.teamStatsRepo.getStats(
                    clash.seasonId.id.toString(),
                    clash.team1.teamId.id.toString(),
                    clash.journey.value
                );
            } catch (error) {
                teamStats = TeamStats.createEmptyTeamStats(
                    clash.seasonId,
                    clash.team1.teamId,
                    clash.journey
                );
            }

            const stats = calculateTeamStats(clashes);

            teamStats.addTeamStats(stats);

            await this.teamStatsRepo.save(teamStats);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
