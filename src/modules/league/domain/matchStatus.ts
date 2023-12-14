import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export type MatchStatusValues = 0 | 1 | 2 | 3 | 4;

type Status = {
    Waiting: MatchStatusValues,
    Live: MatchStatusValues,
    Paused: MatchStatusValues,
    Canceled: MatchStatusValues,
    Finished: MatchStatusValues,
}

export const MatchStatuses: Status = {
    Waiting: 0,
    Live: 1,
    Paused: 2,
    Canceled: 3,
    Finished: 4,
}

interface MatchStatusProps {
    value: number
}

export class MatchStatus extends ValueObject<MatchStatusProps> {
    private static validValues = [0, 1, 2, 3, 4];

    get value(): number {
        return this.props.value;
    }

    private constructor(props: MatchStatusProps) {
        super(props)
    }

    private static validate(value: number) {
        return this.validValues.includes(value)
    }

    public static createNew(value: MatchStatusValues) {
        return new MatchStatus({ value })
    }

    public static create(props: MatchStatusProps) {
        const guard = Guard.againstNullOrUndefined(props.value, 'estado');

        if (guard.isFailure) {
            return Result.fail<MatchStatus>(guard.getErrorValue())
        }

        if (!this.validate(props.value)) {
            return Result.fail<MatchStatus>("Estado invalido")
        }

        return Result.ok<MatchStatus>(new MatchStatus(props))
    }
}
