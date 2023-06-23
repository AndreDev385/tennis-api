import { UserId } from "../../users/domain/userId";
import { Entity } from "../../../shared/domain/Entity";
import { PlayerId } from "./playerId";
import { ClubId } from "./clubId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { FirstName, LastName } from "../../users/domain/names";

interface PlayerProps {
    userId: UserId;
    clubId: ClubId;
    firstName: FirstName,
    lastName: LastName,
}

export class Player extends Entity<PlayerProps> {
    get playerId(): PlayerId {
        return PlayerId.create(this._id).getValue();
    }

    get userId(): UserId {
        return this.props.userId;
    }

    get clubId(): ClubId {
        return this.props.clubId;
    }

    get firstName(): FirstName {
        return this.props.firstName;
    }

    get lastName(): LastName {
        return this.props.lastName;
    }

    public static create(
        props: PlayerProps,
        id?: UniqueEntityID
    ): Result<Player> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.userId, argumentName: "user id" },
            { argument: props.clubId, argumentName: "club id" },
            { argument: props.firstName, argumentName: "nombre" },
            { argument: props.lastName, argumentName: "apellido" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Player>(guardResult.getErrorValue());
        }

        const player = new Player(props, id);

        return Result.ok<Player>(player);
    }
}
