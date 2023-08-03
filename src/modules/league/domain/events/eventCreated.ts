import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { ClubEvent } from "../clubEvent";

export class ClubEventCreated implements IDomainEvent {

    dateTimeOccurred: Date;
    event: ClubEvent

    constructor(event: ClubEvent) {
        this.event = event
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.event.id
    }

}
