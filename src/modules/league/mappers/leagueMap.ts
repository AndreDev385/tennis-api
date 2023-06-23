import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { League } from "../domain/league";
import { Seasons } from "../domain/seasons";
import { LeagueDto } from "../dtos/leagueDto";
import { SeasonDto } from "../dtos/seasonDto";
import { SeasonMap } from "./seasonMap";

export class LeagueMap implements Mapper<League> {
    public static toPersistance(league: League): LeagueDto {
        return {
            leagueId: league.id.id.toString(),
            name: league.name,
        };
    }

    public static toDomain(raw: LeagueDto, seasons?: Array<SeasonDto>): League {
        let seasonsArr = seasons?.map((s) => SeasonMap.toDomain(s));
        const seasonsDomain = Seasons.create(seasonsArr);

        const leagueOrError = League.create(
            { name: raw.name, seasons: seasonsDomain },
            new UniqueEntityID(raw.leagueId)
        );

        leagueOrError.isFailure ? console.log(leagueOrError.getErrorValue()) : "";

        return leagueOrError.isSuccess ? leagueOrError.getValue() : null;
    }
}
