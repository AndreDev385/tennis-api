import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { CategoryId } from "../domain/categoryId";
import { Clash } from "../domain/clubClash";
import { ClubId } from "../domain/clubId";
import { Journey } from "../domain/journey";
import { Matchs } from "../domain/matchs";
import { SeasonId } from "../domain/seasonId";

export class ClashMap implements Mapper<Clash> {
    public static toDomain(raw: any, matchs?: Matchs): Clash {
        const journeyOrError = Journey.create({ value: raw.journey });

        const clubIdOrError = ClubId.create(new UniqueEntityID(raw.clubId))
        const rivalClubIdOrError = ClubId.create(new UniqueEntityID(raw.rivalClubId))
        const hostOrError = ClubId.create(new UniqueEntityID(raw.host))
        const seasonIdOrError = SeasonId.create(new UniqueEntityID(raw.season))
        const categoryIdOrError = CategoryId.create(new UniqueEntityID(raw.categoryId))

        const clashOrError = Clash.create(
            {
                categoryId: categoryIdOrError.getValue(),
                clubId: clubIdOrError.getValue(),
                seasonId: seasonIdOrError.getValue(),
                rivalClubId: rivalClubIdOrError.getValue(),
                hostId: hostOrError.getValue(),
                matchs,
                journey: journeyOrError.getValue() || null,
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
