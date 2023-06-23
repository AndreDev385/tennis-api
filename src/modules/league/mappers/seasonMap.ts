import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Season } from "../domain/season";
import { SeasonDto } from "../dtos/seasonDto";

export class SeasonMap implements Mapper<Season> {
    public static toDomain(raw: any): Season {
        const seasonOrError = Season.create(
            {
                name: raw.name,
            },
            new UniqueEntityID(raw.seasonId)
        );


        seasonOrError.isFailure ? console.log(seasonOrError.getErrorValue()) : "";

        return seasonOrError.isSuccess ? seasonOrError.getValue() : null;
    }

    public static toDto(season: Season): SeasonDto {
        return {
            seasonId: season.seasonId.id.toString(),
            name: season.name,
        };
    }
}
