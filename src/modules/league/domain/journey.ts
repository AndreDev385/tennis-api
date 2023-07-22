import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface JourneyProps {
    value: string;
}

export class Journey extends ValueObject<JourneyProps> {
    get value(): string {
        return this.props.value;
    }

    private static validate(value: string): boolean {
        const validValues = [
            "J1",
            "J2",
            "J3",
            "J4",
            "J5",
            "J6",
            "J7",
            "J8",
            "J9",
            "8vos",
            "4tos",
            "Semi final",
            "Final",
        ];

        return validValues.indexOf(value) >= 0;
    }

    private constructor(props: JourneyProps) {
        super(props);
    }

    public static create(props: JourneyProps): Result<Journey> {
        console.log(props, 'props')
        const guarResult = Guard.againstNullOrUndefined(props.value, "Jornada");

        if (guarResult.isFailure) {
            return Result.fail<Journey>(guarResult.getErrorValue());
        }

        if (!this.validate(props.value)) {
            return Result.fail<Journey>("Jornada Invalida");
        }

        const journey = new Journey(props);

        return Result.ok<Journey>(journey);
    }
}
