import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Match } from "../match";

export class MatchFinished implements IDomainEvent {
    public dateTimeOccurred: Date;
    public match: Match;

    constructor(match: Match) {
        this.match = match;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.match.matchId.id;
    }

}
