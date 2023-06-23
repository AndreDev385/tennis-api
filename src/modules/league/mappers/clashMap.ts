import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ClubClash } from "../domain/clubClash";

export class ClashMap implements Mapper<ClubClash> {
    public static toDomain(raw: any): ClubClash {
        const clashOrError = ClubClash.create(
            {
                categoryId: raw.categoryId,
                clubId: raw.clubId,
                seasonId: raw.seasonId,
                rivalClubId: raw.rivalClubId,
                hostId: raw.hostId,
                matchs: raw.matchs,
                journey: raw.journey,
            },
            new UniqueEntityID(raw.clashId)
        );

        clashOrError.isFailure ? console.log(clashOrError.getErrorValue()) : "";

        return clashOrError.isSuccess ? clashOrError.getValue() : null;
    }

    public static toPersistance(clash: ClubClash) {
        return {
            clashId: clash.clashId.id.toString(),
            categoryId: clash.categoryId.id.toString(),
            club: clash.clubId.id.toString(),
            rivalClub: clash.rivalClubId.id.toString(),
            journey: clash.journey,
            host: clash.hostId.id.toString(),
            seasonId: clash.seasonId.id.toString(),
        };
    }
}
