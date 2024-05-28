import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export const ValidQuantities = {
    one: 1,
    three: 3,
    five: 5,
}

interface SetQuantityProps {
    value: number;
}

export class SetQuantity extends ValueObject<SetQuantityProps> {
    get value(): number {
        return this.props.value;
    }

    private static validate(value: number): boolean {
        const validQuantities = [1, 3, 5];
        if (typeof value !== "number") {
            return false;
        }

        if (validQuantities.indexOf(value) < 0) {
            return false;
        }

        return true;
    }

    private constructor(props: SetQuantityProps) {
        super(props);
    }

    public static createLeagueDefault(): SetQuantity {
        return new SetQuantity({ value: 3 })
    }

    public static create(props: SetQuantityProps): Result<SetQuantity> {
        const guardResult = Guard.againstNullOrUndefined(
            props.value,
            "cantidad de sets"
        );

        if (guardResult.isFailure) {
            return Result.fail<SetQuantity>(guardResult.getErrorValue());
        }

        if (!this.validate(props.value)) {
            return Result.fail<SetQuantity>("Valor invalido");
        }

        const instance = new SetQuantity(props);

        return Result.ok<SetQuantity>(instance);
    }
}
