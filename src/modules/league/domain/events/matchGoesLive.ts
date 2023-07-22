import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Match } from "../match";

export class MatchGoesLive implements IDomainEvent {

    match: Match;
    dateTimeOccurred: Date;

    constructor(match: Match) {
        this.match = match;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.match.id;
    }

}
