import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Season } from "../season";

export class FinishSeason implements IDomainEvent {

    dateTimeOccurred: Date;
    season: Season;

    constructor(season: Season) {
        this.season = season;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.season.id
    }

}
