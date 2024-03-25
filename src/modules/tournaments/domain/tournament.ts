import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Contests } from "./contests";
import { ParticipantId } from "./participantId";
import { TournamentId } from "./tournamentId";
import { TournamentRules } from "./tournamentRules";
import { TournamentStatus } from "./tournamentStatus";

type TournamentProps = {
    name: string;
    rules: TournamentRules;
    status: TournamentStatus;
    startDate: Date;
    endDate: Date;
    contests: Contests;
    participants?: Array<ParticipantId>;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Tournament extends Entity<TournamentProps> {
    get tournamentId(): TournamentId {
        return TournamentId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get rules(): TournamentRules {
        return this.props.rules;
    }

    get status(): TournamentStatus {
        return this.props.status;
    }

    get startDate() {
        return this.props.startDate;
    }

    get endDate() {
        return this.props.endDate
    }

    get contests() {
        return this.props.contests
    }

    get participants(): Array<ParticipantId> {
        return this.props.participants!;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    get updatedAt(): Date {
        return this.props.updatedAt!;
    }

    private constructor(props: TournamentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TournamentProps, id?: UniqueEntityID) {
        return Result.ok<Tournament>(new Tournament({
            ...props,
            participants: props.participants ?? [],
            contests: props.contests ?? Contests.create(),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }, id));
    }
}
