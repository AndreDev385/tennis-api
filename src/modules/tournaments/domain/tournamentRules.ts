import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Category } from "../../league/domain/category";
import { Mode } from "../../league/domain/gameMode";
import { GamesPerSet } from "../../league/domain/gamesPerSet";
import { SetQuantity } from "../../league/domain/setQuantity";
import { TeamsConfig } from "./teamsConfig";

export type CategoryType = "sumatoria" | "unica"; // category or summation 

type RulesProps = {
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
    categoryType: CategoryType;
    category?: Category | null;
    summation?: number | null;
    isTeamClash: boolean;
    mode?: Mode | null;
    teamsConfig?: TeamsConfig | null;
};

export class TournamentRules extends ValueObject<RulesProps> {
    get setsQuantity(): SetQuantity {
        return this.props.setsQuantity;
    }

    get gamesPerSet(): GamesPerSet {
        return this.props.gamesPerSet;
    }

    get categoryType() {
        return this.props.categoryType;
    }

    get category(): Category | null {
        return this.props.category!;
    }

    get summation(): number | null {
        return this.props.summation!;
    }

    get isTeamClash(): boolean {
        return this.props.isTeamClash;
    }

    get mode(): Mode | null {
        return this.props.mode!;
    }

    get teamsConfig(): TeamsConfig | null {
        return this.props.teamsConfig!;
    }

    private constructor(props: RulesProps) {
        super(props);
    }

    public static create(props: RulesProps) {
        return Result.ok<TournamentRules>(new TournamentRules({
            ...props,
            mode: props.mode ?? null,
            category: props.category ?? null,
            summation: props.summation ?? null,
            teamsConfig: props.teamsConfig ?? null
        }));
    }
}
