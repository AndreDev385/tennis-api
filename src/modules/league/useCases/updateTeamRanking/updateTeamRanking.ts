import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Clash } from "../../domain/clubClash";
import { Ranking, positions } from "../../domain/ranking";
import { ClashRepository } from "../../repositories/clashRepo";
import { RankingRepository } from "../../repositories/rankingRepo";
import { UpdateTeamRankingRequest } from "./dto";

type Response = Either<AppError.UnexpectedError | Result<string>, Result<void>>;

export class UpdateTeamRanking
    implements UseCase<UpdateTeamRankingRequest, Response>
{
    private rankingRepo: RankingRepository;
    private clashRepo: ClashRepository;

    constructor(rankingRepo: RankingRepository, clashRepo: ClashRepository) {
        this.clashRepo = clashRepo;
        this.rankingRepo = rankingRepo;
    }

    async execute(request: UpdateTeamRankingRequest): Promise<Response> {
        let clash: Clash;
        let ranking: Ranking;

        try {
            try {
                clash = await this.clashRepo.getClashById(request.clashId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                ranking = await this.rankingRepo.getRanking(
                    clash.team1.teamId.id.toString(),
                    clash.seasonId.id.toString()
                );
            } catch (error) {
                const rankingOrError = Ranking.create({
                    team: clash.team1,
                    seasonId: clash.seasonId,
                    position: positions.groups,
                });

                if (rankingOrError.isFailure) {
                    return left(Result.fail<string>("Posicion invalida"));
                }
                ranking = rankingOrError.getValue();
            }

            ranking.updateRankingPosition(clash);

            await this.rankingRepo.save(ranking);

            return right(Result.ok<void>());
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
