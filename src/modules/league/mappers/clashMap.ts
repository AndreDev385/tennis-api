import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Clash } from "../domain/clubClash";
import { Journey } from "../domain/journey";
import { Matchs } from "../domain/matchs";
import { SeasonId } from "../domain/seasonId";
import { ClashDto } from "../dtos/clashDto";
import { CategoryMap } from "./categoryMap";
import { MatchMap } from "./matchMap";
import { TeamMap } from "./teamMap";

export class ClashMap implements Mapper<Clash> {
    public static toDomain(raw: any, matchs?: Matchs): Clash {
        const journeyOrError = Journey.create({ value: raw.journey });
        const seasonIdOrError = SeasonId.create(
            new UniqueEntityID(raw.seasonId)
        );

        const clashOrError = Clash.create(
            {
                category: CategoryMap.toDomain(raw.category),
                seasonId: seasonIdOrError.getValue(),
                team1: raw.team1,
                team2: raw.team2,
                host: raw.host,
                matchs: matchs || Matchs.create(),
                journey: journeyOrError.getValue() || null,
                isFinish: raw.isFinish,
            },
            new UniqueEntityID(raw.clashId)
        );

        clashOrError.isFailure ? console.log(clashOrError.getErrorValue()) : "";

        return clashOrError.isSuccess ? clashOrError.getValue() : null;
    }

    public static toPersistance(clash: Clash) {
        return {
            seasonId: clash.seasonId.id.toString(),
            clashId: clash.clashId.id.toString(),
            categoryId: clash.category.categoryId.id.toString(),
            team1: clash.team1.teamId.id.toString(),
            team2: clash.team2.teamId.id.toString(),
            journey: clash.journey.value,
            host: clash.host.clubId.id.toString(),
            isFinish: clash.isFinish,
        };
    }

    public static toDto(clash: Clash): ClashDto {
        return {
            seasonId: clash.seasonId.id.toString(),
            clashId: clash.clashId.id.toString(),
            category: clash.category.name,
            team1: TeamMap.toDto(clash.team1),
            team2: TeamMap.toDto(clash.team2),
            journey: clash.journey.value,
            host: clash.host.name,
            matchs: clash.matchs.map((match) => MatchMap.toDto(match)),
            isFinish: clash.isFinish,
        };
    }
}
