import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { GamesPerSet } from "../../league/domain/gamesPerSet";
import { SetQuantity } from "../../league/domain/setQuantity";
import { MatchesPerClash } from "./matchesPerClash";

type RulesProps = {
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
    matchesPerClash?: MatchesPerClash | null;
    goldenPoint?: boolean;
};

export class TournamentRules extends ValueObject<RulesProps> {
    get setsQuantity(): SetQuantity {
        return this.props.setsQuantity;
    }

    get gamesPerSet(): GamesPerSet {
        return this.props.gamesPerSet;
    }

    get matchesPerClash(): MatchesPerClash | null {
        return this.props.matchesPerClash!;
    }

    get goldenPoint(): boolean {
        return this.props.goldenPoint!;
    }

    private constructor(props: RulesProps) {
        super(props);
    }

    public static create(props: RulesProps) {
        return Result.ok<TournamentRules>(
            new TournamentRules({
                ...props,
                matchesPerClash: props.matchesPerClash ?? null,
                goldenPoint: props.goldenPoint ?? false,
            })
        );
    }
}
