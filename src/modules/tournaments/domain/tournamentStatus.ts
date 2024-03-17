import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

type StatusProps = {
    value: number;
};

export const tournamentStatuses = {
    Waiting: 0,
    InProgress: 1,
    Finished: 2,
};

export class TournamentStatus extends ValueObject<StatusProps> {
    get value(): number {
        return this.props.value;
    }

    private constructor(props: StatusProps) {
        super(props);
    }

    private static isValid(value: number): boolean {
        for (const v of Object.values(tournamentStatuses)) {
            if (v == value) {
                return true;
            }
        }
        return false;
    }

    public static create(props: StatusProps): Result<TournamentStatus> {
        if (!this.isValid(props.value)) {
            return Result.fail("Estado invalido");
        }
        return Result.ok<TournamentStatus>(new TournamentStatus(props));
    }

    public static waiting() {
        return new TournamentStatus({ value: tournamentStatuses.Waiting });
    }

    public static inProgress() {
        return new TournamentStatus({ value: tournamentStatuses.InProgress });
    }

    public static finished() {
        return new TournamentStatus({ value: tournamentStatuses.Finished });
    }
}
