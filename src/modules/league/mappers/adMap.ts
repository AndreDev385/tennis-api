import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Ad } from "../domain/ad";
import { ClubId } from "../domain/clubId";

export class AdMap implements Mapper<Ad> {
    public static toDomain(raw: any): Ad {
        const clubId = ClubId.create(new UniqueEntityID(raw.clubId))

        const adOrError = Ad.create({
            clubId: clubId.getValue(),
            image: raw.image,
            link: raw.link
        }, new UniqueEntityID(raw.adId))


        adOrError.isFailure && console.log(adOrError.getErrorValue());

        return adOrError.isSuccess ? adOrError.getValue() : null
    }

    public static toPersistance(ad: Ad) {
        return {
            adId: ad.adId.id.toString(),
            clubId: ad.clubId.id.toString(),
            link: ad.link,
            image: ad.image,
        }
    }
}
