import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export const Surfaces = {
    grass: "grama",
    clay: "arcilla",
    hard: "dura",
};

interface SurfaceProps {
    value: string;
}

export class Surface extends ValueObject<SurfaceProps> {
    get value(): string {
        return this.props.value;
    }

    private static validate(value: string): boolean {
        if (Object.values(Surfaces).indexOf(value) < 0) {
            return false;
        }
        return true;
    }

    private constructor(props: SurfaceProps) {
        super(props);
    }

    public static create(props: SurfaceProps): Result<Surface> {
        const guard = Guard.againstNullOrUndefined(props.value, "superficie");

        if (guard.isFailure) {
            return Result.fail<Surface>(guard.getErrorValue());
        }

        if (!this.validate(props.value)) {
            return Result.fail<Surface>("surperficie invalida");
        }

        const instance = new Surface(props);

        return Result.ok<Surface>(instance);
    }
}
