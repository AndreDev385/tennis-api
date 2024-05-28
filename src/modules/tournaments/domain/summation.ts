import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

type SummationProps = {
    letter: string;
    value: number;
};

const letterValues = ["M", "F", "MM", "FEM-MM", "DM"];

export class Summation extends ValueObject<SummationProps> {
    get letter(): string {
        return this.props.letter;
    }
    get value(): number {
        return this.props.value;
    }

    private constructor(props: SummationProps) {
        super(props);
    }

    private static validate(props: SummationProps) {
        const validLetter = letterValues.find((v) => v === props.letter);
        if (!validLetter) {
            return Result.fail<string>("Categoria invalida");
        }

        if (props.value < 4 || props.value > 12) {
            return Result.fail<string>("Sumatoria invalida");
        }

        return Result.ok<void>();
    }

    public static create(props: SummationProps): Result<Summation> {
        const result = this.validate(props);

        if (result.isFailure) {
            return Result.fail(`${result.getErrorValue()}`);
        }

        return Result.ok(new Summation(props));
    }
}
