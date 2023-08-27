import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Ranking } from "../domain/ranking";
import { SeasonId } from "../domain/seasonId";
import { TeamId } from "../domain/teamId";

export class RankingMap implements Mapper<Ranking> {

    public static toDto(ranking: Ranking) {
        return {
            rankingId: ranking.rankindId.id.toString(),
            position: ranking.position,
            teamId: ranking.teamId.id.toString(),
            seasonId: ranking.seasonId.id.toString(),
        }
    }

    public static toDomain(raw: any) {
        const teamIdOrErrorId = TeamId.create(new UniqueEntityID(raw.teamId));
        const seasonIdOrErrorId = SeasonId.create(new UniqueEntityID(raw.seasonId));

        const rankingOrError = Ranking.create({
            position: raw.position,
            teamId: teamIdOrErrorId.getValue(),
            seasonId: seasonIdOrErrorId.getValue(),
        }, new UniqueEntityID(raw.rankingId))

        rankingOrError.isFailure && console.log(rankingOrError.getErrorValue())

        return rankingOrError.isSuccess ? rankingOrError.getValue() : null;
    }
}
