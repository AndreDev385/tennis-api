import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { ClubEvent } from "../domain/clubEvent";
import { ClubEventId } from "../domain/clubEventId";

export class ClubEventMap implements Mapper<ClubEvent> {

    public static toDomain(raw: any): ClubEvent | null {
        const clubId = ClubEventId.create(new UniqueEntityID(raw.clubId));

        const clubEventOrError = ClubEvent.create({
            clubId: clubId.getValue(),
            image: raw.image,
            link: raw.link,
        }, new UniqueEntityID(raw.clubEventId));

        clubEventOrError.isFailure && console.log(clubEventOrError.getErrorValue())

        return clubEventOrError.isSuccess ? clubEventOrError.getValue() : null
    }

    public static toPersistance(event: ClubEvent) {
        return {
            clubEventId: event.clubEventId.id.toString(),
            clubId: event.clubId.id.toString(),
            link: event.link,
            image: event.image,
        }
    }
}
