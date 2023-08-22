import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { User } from "../user";

export class UserLoggedIn implements IDomainEvent {
    public dateTimeOccurred: Date;
    public user: User

    constructor(user: User) {
        console.log(user.id, "IN LOGGED IN")
        this.user = user;
        this.dateTimeOccurred = new Date();
    }

    public getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}
