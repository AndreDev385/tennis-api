import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { LeagueId } from "../domain/leagueId";
import { Season } from "../domain/season";
import { SeasonDto } from "../dtos/seasonDto";

export class SeasonMap implements Mapper<Season> {
    public static toDomain(raw: any): Season {

        const leagueIdOrError = LeagueId.create(new UniqueEntityID(raw.leagueId));

        const seasonOrError = Season.create(
            {
                leagueId: leagueIdOrError.getValue(),
                name: raw.name,
                isCurrentSeason: raw.isCurrentSeason,
                isFinish: raw.isFinish,
            },
            new UniqueEntityID(raw.seasonId)
        );


        seasonOrError.isFailure ? console.log(seasonOrError.getErrorValue()) : "";

        return seasonOrError.isSuccess ? seasonOrError.getValue() : null;
    }

    public static toDto(season: Season): SeasonDto {
        return {
            seasonId: season.seasonId.id.toString(),
            leagueId: season.leagueId.id.toString(),
            name: season.name,
            isFinish: season.isFinish,
            isCurrentSeason: season.isCurrentSeason,
        };
    }
}
