import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface JourneyProps {
	value: string;
}

export const journeyValues = {
	J1: "J1",
	J2: "J2",
	J3: "J3",
	J4: "J4",
	J5: "J5",
	J6: "J6",
	J7: "J7",
	J8: "J8",
	J9: "J9",
	RoundOf16: "8vos",
	CuarterFinals: "4tos",
	Semifinals: "Semi final",
	Third: "3er puesto",
	Final: "Final",
};

export class Journey extends ValueObject<JourneyProps> {
	get value(): string {
		return this.props.value;
	}

	private static validate(value: string): boolean {
		const validValues = Object.values(journeyValues);

		return validValues.indexOf(value) >= 0;
	}

	private constructor(props: JourneyProps) {
		super(props);
	}

	public static create(props: JourneyProps): Result<Journey> {
		console.log(props, "props");
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
