import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Club } from "../domain/club";
import { ClubDto } from "../dtos/clubDto";

export class ClubMap implements Mapper<Club> {
    public static toDomain(raw: any): Club {
        const clubOrError = Club.create(
            {
                name: raw.name,
                code: raw.code,
                symbol: raw.symbol,
            },
            new UniqueEntityID(raw.clubId)
        );

        clubOrError.isFailure ? console.log(clubOrError.getErrorValue()) : "";

        return clubOrError.isSuccess ? clubOrError.getValue() : null;
    }

    public static toPersistance(club: Club) {
        return {
            clubId: club.clubId.id.toString(),
            name: club.name,
            code: club.code,
            symbol: club.symbol,
        };
    }

    public static toDto(club: Club): ClubDto {
        return {
            name: club.name,
            code: club.code,
            clubId: club.clubId.id.toString(),
        };
    }
}
