import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { GamesPerSet } from "../../league/domain/gamesPerSet";
import { SetQuantity } from "../../league/domain/setQuantity";

type RulesProps = {
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
};

export class TournamentRules extends ValueObject<RulesProps> {
    get setsQuantity(): SetQuantity {
        return this.props.setsQuantity;
    }

    get gamesPerSet(): GamesPerSet {
        return this.props.gamesPerSet;
    }

    private constructor(props: RulesProps) {
        super(props);
    }

    public static create(props: RulesProps) {
        return Result.ok<TournamentRules>(new TournamentRules(props));
    }
}
