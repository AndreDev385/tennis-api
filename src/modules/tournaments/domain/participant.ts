import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Devices } from "../../league/domain/devices";
import { Name } from "../../users/domain/names";
import { UserId } from "../../users/domain/userId";

export type ParticipantProps = {
    userId: UserId;
    firstName: Name;
    lastName: Name;
    avatar?: string | null;
    devices?: Devices;
    isDeleted?: boolean;
};

export class Participant extends Entity<ParticipantProps> {
    get userId(): UserId {
        return this.props.userId;
    }
    get firstName(): Name {
        return this.props.firstName;
    }
    get lastName(): Name {
        return this.props.lastName;
    }

    get avatar(): string | null {
        return this.props.avatar!;
    }

    get devices(): Devices {
        return this.props.devices!;
    }

    get isDeleted(): boolean {
        return this.props.isDeleted!;
    }

    private constructor(props: ParticipantProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ParticipantProps, id?: UniqueEntityID) {
        return Result.ok<Participant>(
            new Participant(
                {
                    ...props,
                    avatar: props.avatar ?? null,
                    isDeleted: props.isDeleted ?? false,
                    devices: props.devices ?? Devices.create(),
                },
                id
            )
        );
    }
}
