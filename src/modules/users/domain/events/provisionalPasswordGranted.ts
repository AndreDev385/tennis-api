import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { User } from "../user";

export class ProvisionalPasswordGranted implements IDomainEvent {
    dateTimeOccurred: Date;
    user: User;
    password: string;

    constructor(user: User, password: string) {
        this.user = user;
        this.password = password;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }

}
