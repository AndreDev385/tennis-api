import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Ranking } from "../domain/ranking";
import { SeasonId } from "../domain/seasonId";
import { Team } from "../domain/team";
import { RankingDto } from "../dtos/rankingDto";
import { TeamMap } from "./teamMap";

export interface toDomainRanking {
    team: Team,
    position: string;
    seasonId: string;
    rankingId: string;
    symbol: string;
}

export class RankingMap implements Mapper<Ranking> {

    public static toDto(ranking: Ranking): RankingDto {
        return {
            rankingId: ranking.rankingId.id.toString(),
            position: ranking.position,
            symbol: ranking.symbol,
            team: TeamMap.toDto(ranking.team),
            seasonId: ranking.seasonId.id.toString(),
        }
    }

    public static toDomain(raw: toDomainRanking) {
        const seasonIdOrErrorId = SeasonId.create(new UniqueEntityID(raw.seasonId));

        const rankingOrError = Ranking.create({
            position: raw.position,
            team: raw.team,
            symbol: raw.symbol,
            seasonId: seasonIdOrErrorId.getValue(),
        }, new UniqueEntityID(raw.rankingId))

        rankingOrError.isFailure && console.log(rankingOrError.getErrorValue())

        return rankingOrError.isSuccess ? rankingOrError.getValue() : null;
    }

    public static toPersistance(ranking: Ranking) {
        return {
            rankingId: ranking.rankingId.id.toString(),
            position: ranking.position,
            teamId: ranking.team.teamId.id.toString(),
            seasonId: ranking.seasonId.id.toString(),
            symbol: ranking.symbol,
        }
    }
}
