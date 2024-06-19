import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ContestId } from "./contestId";
import { ContestTeamId } from "./contestTeamId";
import { ParticipantId } from "./participantId";
import { ParticipantsIds } from "./participantsIds";

type ContestTeamProps = {
    contestId: ContestId;
    name: string;
    participantsIds: ParticipantsIds;
};

export class ContestTeam extends Entity<ContestTeamProps> {
    get contestTeamId(): ContestTeamId {
        return ContestTeamId.create(this._id).getValue();
    }
    get contestId(): ContestId {
        return this.props.contestId;
    }
    get name(): string {
        return this.props.name;
    }
    get participantsIds(): ParticipantsIds {
        return this.props.participantsIds;
    }

    public addParticipantsIds(ids: ParticipantId[]) {
        for (const id of ids) {
            if (!this.participantsIds.exists(id)) {
                console.log(`ID DONT EXIST ${!this.participantsIds.exists(id)}`)
                this.participantsIds.add(id);
            }
        }
    }


    public removeParticipantsIds(ids: ParticipantId[]) {
        for (const id of ids) {
            if (this.participantsIds.exists(id)) {
                this.participantsIds.remove(id);
            }
        }
    }

    private constructor(props: ContestTeamProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ContestTeamProps,
        id?: UniqueEntityID
    ): Result<ContestTeam> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.contestId, argumentName: "id de competencia" },
            { argument: props.name, argumentName: "nombre del equipo" },
            { argument: props.participantsIds, argumentName: "participantes" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        return Result.ok(
            new ContestTeam(
                {
                    ...props,
                    participantsIds:
                        props.participantsIds ?? ParticipantsIds.create([]),
                },
                id
            )
        );
    }
}
