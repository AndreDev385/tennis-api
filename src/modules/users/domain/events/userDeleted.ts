import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { User } from "../user";

export class UserDeleted implements IDomainEvent {
    dateTimeOccurred: Date;
    user: User

    constructor(user: User) {
        this.user = user;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }

}
