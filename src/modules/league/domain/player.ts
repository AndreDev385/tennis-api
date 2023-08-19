import { UserId } from "../../users/domain/userId";
import { PlayerId } from "./playerId";
import { ClubId } from "./clubId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { FirstName, LastName } from "../../users/domain/names";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { PlayerCreated } from "./events/playerCreated";

interface PlayerProps {
    userId: UserId;
    clubId: ClubId;
    firstName: FirstName,
    lastName: LastName,
    avatar?: string;
}

export class Player extends AggregateRoot<PlayerProps> {
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

    get avatar(): string {
        return this.props.avatar;
    }

    private constructor(props: PlayerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public addAvatar(path: string) {
        this.props.avatar = path;
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

        const isNew = !!id == false

        const player = new Player(props, id);

        if (isNew) {
            player.addDomainEvent(new PlayerCreated(player))
        }

        return Result.ok<Player>(player);
    }
}
