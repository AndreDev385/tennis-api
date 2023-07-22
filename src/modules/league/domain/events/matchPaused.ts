import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Match } from "../match";

export class MatchPaused implements IDomainEvent {
    dateTimeOccurred: Date;
    match: Match;

    constructor(match: Match) {
        this.match = match;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.match.id;
    }

}
