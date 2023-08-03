import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ClubId } from "./clubId";
import { ClubEventId } from "./clubEventId";
import { ClubEventCreated } from "./events/eventCreated";

interface ClubEventProps {
    link: string;
    image: string;
    clubId: ClubId;
}

export class ClubEvent extends AggregateRoot<ClubEventProps> {

    get clubEventId(): ClubEventId {
        return ClubEventId.create(this._id).getValue();
    }

    get link(): string {
        return this.props.link
    }

    get image(): string {
        return this.props.image
    }

    get clubId(): ClubId {
        return this.props.clubId
    }

    private constructor(props: ClubEventProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ClubEventProps, id?: UniqueEntityID) {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.clubId, argumentName: "Club" },
            { argument: props.image, argumentName: "Imagen" },
            { argument: props.link, argumentName: "Link" },
        ])

        if (guardResult.isFailure) {
            return Result.fail<ClubEvent>(guardResult.getErrorValue())
        }

        const isNew = !!id === false;

        const event = new ClubEvent(props, id);

        if (isNew) {
            event.addDomainEvent(new ClubEventCreated(event))
        }

        return Result.ok(event);
    }
}
