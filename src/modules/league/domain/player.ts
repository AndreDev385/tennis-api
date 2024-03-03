import { UserId } from "../../users/domain/userId";
import { PlayerId } from "./playerId";
import { ClubId } from "./clubId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { FirstName, LastName } from "../../users/domain/names";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { PlayerCreated } from "./events/playerCreated";
import { Devices } from "./devices";

interface PlayerProps {
    userId: UserId;
    clubId: ClubId;
    firstName: FirstName;
    lastName: LastName;
    avatar?: string | null;
    devices?: Devices;
    isDeleted?: boolean;
}

export class Player extends AggregateRoot<PlayerProps> {
    get playerId(): PlayerId {
        return PlayerId.create(this._id).getValue();
    }

    get userId(): UserId {
        return this.props.userId;
    }

    get clubId(): ClubId | null {
        return this.props.clubId;
    }

    get firstName(): FirstName {
        return this.props.firstName;
    }

    get lastName(): LastName {
        return this.props.lastName;
    }

    get avatar(): string | undefined | null {
        return this.props.avatar;
    }

    get devices(): Devices {
        return this.props.devices!;
    }

    get isDeleted(): boolean {
        return this.props.isDeleted!;
    }

    private constructor(props: PlayerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public addAvatar(path: string) {
        this.props.avatar = path;
    }

    public addDevice(token: string) {
        if (this.devices.exists(token)) {
            return;
        }
        this.devices.add(token);
    }

    public delete() {
        this.props.isDeleted = true;
        // event
    }

    public changeClub(clubId: ClubId) {
        this.props.clubId = clubId;
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

        const isNew = !!id == false;

        const player = new Player(
            {
                ...props,
                devices: props.devices ?? Devices.create(),
                isDeleted: props.isDeleted ?? false,
            },
            id
        );

        if (isNew) {
            player.addDomainEvent(new PlayerCreated(player));
        }

        return Result.ok<Player>(player);
    }
}
