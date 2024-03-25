import { ValueObject } from "../../../shared/domain/ValueObject";
import { Category } from "../../league/domain/category";
import { Result } from "../../../shared/core/Result";
import { GameMode, Mode } from "../../league/domain/gameMode";
import { Summation } from "./summation";

type ContestProps = {
    mode: Mode;
    categoryType: CategoryType;
    category?: Category | null;
    summation?: Summation | null;
};

export enum CategoryTypes {
    SUMMATION = 0,
    CATEGORY = 1,
    OPEN = 2,
}

export type CategoryType = CategoryTypes;

export class Contest extends ValueObject<ContestProps> {
    get mode(): Mode {
        return this.props.mode;
    }
    get categoryType(): CategoryType {
        return this.props.categoryType;
    }
    get category(): Category | null {
        return this.props.category!;
    }
    get summation(): Summation | null {
        return this.props.summation!;
    }

    private constructor(props: ContestProps) {
        super(props);
    }

    private static isValid({
        categoryType,
        summation,
        mode,
        category,
    }: ContestProps): Result<string | void> {
        if (
            (categoryType === CategoryTypes.SUMMATION && !summation) ||
            (categoryType === CategoryTypes.SUMMATION &&
                mode.value != GameMode.double)
        )
            return Result.fail<string>("Un concurso de suma debe ser doble");

        if (categoryType === CategoryTypes.CATEGORY && !category)
            return Result.fail<string>(
                "Selecciona una categoria para el consurso"
            );

        if (
            categoryType != CategoryTypes.CATEGORY &&
            categoryType != CategoryTypes.SUMMATION &&
            categoryType &&
            categoryType != CategoryTypes.OPEN
        )
            return Result.fail<string>("Tipo de concurso invalido");

        return Result.ok<void>();
    }

    public static create(props: ContestProps): Result<Contest> {
        const validation = this.isValid(props);
        if (validation.isFailure) {
            return Result.fail(`${validation.getErrorValue()}`);
        }

        return Result.ok<Contest>(new Contest(props));
    }
}
