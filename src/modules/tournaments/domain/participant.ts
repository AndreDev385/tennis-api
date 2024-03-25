import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { User } from "../../users/domain/user";
import { ParticipantId } from "./participantId";

export type ParticipantProps = {
    user: User;
    avatar?: string | null;
    device?: string;
    isDeleted?: boolean;
};

export class Participant extends Entity<ParticipantProps> {
    get participantId(): ParticipantId {
        return ParticipantId.create(this._id).getValue();
    }
    get user(): User {
        return this.props.user;
    }
    get avatar(): string | null {
        return this.props.avatar!;
    }
    get device(): string {
        return this.props.device!;
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
                },
                id
            )
        );
    }
}
