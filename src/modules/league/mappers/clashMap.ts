import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Clash } from "../domain/clubClash";
import { Journey } from "../domain/journey";

export class ClashMap implements Mapper<Clash> {
    public static toDomain(raw: any): Clash {
        const journeyOrError = Journey.create(raw.journey);

        const clashOrError = Clash.create(
            {
                categoryId: raw.categoryId,
                clubId: raw.clubId,
                seasonId: raw.seasonId,
                rivalClubId: raw.rivalClubId,
                hostId: raw.hostId,
                matchs: raw.matchs,
                journey: journeyOrError.getValue(),
            },
            new UniqueEntityID(raw.clashId)
        );

        clashOrError.isFailure ? console.log(clashOrError.getErrorValue()) : "";

        return clashOrError.isSuccess ? clashOrError.getValue() : null;
    }

    public static toPersistance(clash: Clash) {
        return {
            clashId: clash.clashId.id.toString(),
            categoryId: clash.categoryId.id.toString(),
            club: clash.clubId.id.toString(),
            rivalClub: clash.rivalClubId.id.toString(),
            journey: clash.journey.value,
            host: clash.hostId.id.toString(),
            seasonId: clash.seasonId.id.toString(),
        };
    }
}
