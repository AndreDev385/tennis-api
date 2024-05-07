import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export type PhaseValues = 0 | 1 | 2;

type PhaseProps = {
    value: PhaseValues;
};

export enum Phases {
    MainTree = 0,
    ForThirdTree = 1,
    RepechageTree = 2,
}

export function mapPhaseToString(phase: Phase): string {
    let table = "";
    switch (phase.value) {
        case Phases.MainTree:
            table = "Principal";
            break
        case Phases.ForThirdTree:
            table = "3er lugar";
            break;
        case Phases.RepechageTree:
            table = "Repechage";
            break;
    }
    return table;
}

export class Phase extends ValueObject<PhaseProps> {
    get value() {
        return this.props.value;
    }

    private constructor(props: PhaseProps) {
        super(props);
    }

    public static new(value: Phases) {
        return new Phase({ value: value });
    }

    public static create(value: number): Result<Phase> {
        const validValues = [0, 1, 2, 3];
        if (!validValues.includes(value)) {
            return Result.fail("Fase invalida");
        }
        return Result.ok(new Phase({ value: value as PhaseValues }));
    }
}
