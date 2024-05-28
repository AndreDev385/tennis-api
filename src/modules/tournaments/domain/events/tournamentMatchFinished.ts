import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { TournamentMatch } from "../tournamentMatch";

export class TournamentMatchFinished implements IDomainEvent {
    public dateTimeOccurred: Date;
    public match: TournamentMatch;

    constructor(match: TournamentMatch) {
        this.match = match;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.match.id;
    }
}
