import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Team } from "../team";

export class TeamDeleted implements IDomainEvent {
    dateTimeOccurred: Date;
    team: Team;

    constructor(team: Team) {
        this.team = team;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.team.id;
    }
}
