import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

type MatchesPerClashProps = {
    value: 3 | 5;
};

export class MatchesPerClash extends ValueObject<MatchesPerClashProps> {
    get value(): 3 | 5 {
        return this.props.value;
    }

    private constructor(props: MatchesPerClashProps) {
        super(props);
    }

    private static isValid(value: number) {
        return value == 3 || value == 5;
    }

    public static create(props: MatchesPerClashProps): Result<MatchesPerClash> {
        const guard = Guard.againstNullOrUndefined(
            props,
            "cantidad de partidos por encuentro"
        );

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        if (!this.isValid(props.value)) {
            return Result.fail("Deben jugarse 3 o 5 partidos por encuentro");
        }

        return Result.ok(new MatchesPerClash(props));
    }
}
