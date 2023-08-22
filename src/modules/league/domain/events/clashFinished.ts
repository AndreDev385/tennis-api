import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Clash } from "../clubClash";

export class ClashFinished implements IDomainEvent {

    dateTimeOccurred: Date;
    public clash: Clash;

    constructor(clash: Clash) {
        this.clash = clash;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.clash.id
    }

}
