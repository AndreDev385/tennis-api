import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { Player } from "../player";

export class PlayerCreated implements IDomainEvent {
    dateTimeOccurred: Date;
    player: Player;

    constructor(player: Player) {
        this.player = player;
        this.dateTimeOccurred = new Date();
    }

    getAggregateId(): UniqueEntityID {
        return this.player.id
    }

}
