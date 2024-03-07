import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

type TeamsConfigProps = {
    matchesQty: number;
    singlesQty: number;
    doublesQty: number;
};

export class TeamsConfig extends ValueObject<TeamsConfigProps> {
    get matchesQty(): number {
        return this.props.matchesQty;
    }
    get singlesQty(): number {
        return this.props.singlesQty;
    }
    get doublesQty(): number {
        return this.props.doublesQty;
    }

    private constructor(props: TeamsConfigProps) {
        super(props);
    }

    public static create(props: TeamsConfigProps) {
        return Result.ok<TeamsConfig>(new TeamsConfig(props));
    }
}
