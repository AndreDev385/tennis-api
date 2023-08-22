import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AdId } from "./adId";
import { ClubId } from "./clubId";
import { AdCreated } from "./events/adCreated";

interface AdsProps {
    link: string;
    image: string;
    clubId: ClubId;
}

export class Ad extends AggregateRoot<AdsProps> {
    get adId(): AdId {
        return AdId.create(this._id).getValue();
    }

    get link(): string {
        return this.props.link;
    }

    get image(): string {
        return this.props.image;
    }

    get clubId(): ClubId {
        return this.props.clubId;
    }

    private constructor(props: AdsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: AdsProps, id?: UniqueEntityID): Result<Ad> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.clubId, argumentName: "club" },
            { argument: props.image, argumentName: "imagen" },
            { argument: props.link, argumentName: "link" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Ad>(guardResult.getErrorValue());
        }

        const isNew = !id === false;

        const ad = new Ad(props, id);

        if (isNew) {
            ad.addDomainEvent(new AdCreated(ad));
        }

        return Result.ok<Ad>(ad);
    }
}
