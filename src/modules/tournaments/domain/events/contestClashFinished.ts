import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { ContestClash } from "../contestClash";

export class ContestClashFinished implements IDomainEvent {
    public dateTimeOccurred: Date;
    public clash: ContestClash;

    constructor(clash: ContestClash) {
        this.clash = clash;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.clash.id;
    }
}
