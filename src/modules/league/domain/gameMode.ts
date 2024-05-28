import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export enum GameMode {
    single = "single",
    double = "double",
    team = "team",
}

interface ModeProps {
    value: string;
}

export class Mode extends ValueObject<ModeProps> {
    get value(): string {
        return this.props.value;
    }

    private static validate(value: string): boolean {
        if (
            value !== GameMode.single &&
            value !== GameMode.double &&
            value !== GameMode.team
        ) {
            return false;
        }

        return true;
    }

    private constructor(props: ModeProps) {
        super(props);
    }

    public static create(props: ModeProps): Result<Mode> {
        const guard = Guard.againstNullOrUndefined(props.value, "modo");

        if (guard.isFailure) {
            return Result.fail<Mode>(guard.getErrorValue());
        }

        if (!this.validate(props.value)) {
            return Result.fail("modo invalido");
        }

        const instance = new Mode(props);

        return Result.ok<Mode>(instance);
    }
}
