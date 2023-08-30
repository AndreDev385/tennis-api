import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Ranking } from "../../domain/ranking";
import { Season } from "../../domain/season";
import { Team } from "../../domain/team";
import { RankingMap } from "../../mappers/rankingMap";
import { RankingRepository } from "../../repositories/rankingRepo";
import { SeasonRepository } from "../../repositories/seasonRepo";
import { TeamRepository } from "../../repositories/teamRepo";
import { GetTeamRankingRequest } from "./dto";

type Response = Either<AppError.UnexpectedError | AppError.NotFoundError | Result<string>, Result<any>>

export class GetTeamRanking implements UseCase<GetTeamRankingRequest, any> {

    private teamRepo: TeamRepository;
    private rankingRepo: RankingRepository;
    private seasonRepo: SeasonRepository;

    constructor(teamRepo: TeamRepository, rankingRepo: RankingRepository, seasonRepo: SeasonRepository) {
        this.rankingRepo = rankingRepo;
        this.teamRepo = teamRepo;
        this.seasonRepo = seasonRepo;
    }

    async execute(request: GetTeamRankingRequest): Promise<Response> {
        let team: Team;
        let season: Season;
        let ranking: Ranking;

        try {
            try {
                team = await this.teamRepo.getById(request.teamId);
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                season = await this.seasonRepo.currentSeason()
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            try {
                ranking = await this.rankingRepo.getRanking(team.teamId.id.toString(), season.seasonId.id.toString());
            } catch (error) {
                return left(new AppError.NotFoundError(error));
            }

            return right(Result.ok(RankingMap.toDto(ranking)))
        } catch (error) {
            return left(new AppError.UnexpectedError(error));
        }
    }

}
