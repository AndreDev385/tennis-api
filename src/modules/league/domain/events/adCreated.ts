import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Ad } from "../ad";

export class AdCreated implements IDomainEvent {
    dateTimeOccurred: Date;
    ad: Ad;

    constructor(ad: Ad) {
        this.ad = ad;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.ad.id;
    }
}
