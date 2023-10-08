import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { SetStats } from "./setStats";

interface SetProps {
    myGames: number;
    rivalGames: number;
    setWon: boolean | null;
    stats: SetStats | null;
}

export class Set extends ValueObject<SetProps> {
    get myGames(): number {
        return this.props.myGames;
    }

    get rivalGames(): number {
        return this.props.rivalGames;
    }

    get setWon(): boolean | null {
        return this.props.setWon;
    }

    get stats(): SetStats | null {
        return this.props.stats;
    }

    private constructor(props: SetProps) {
        super(props);
    }

    public static createDefaultLeague(): Set {
        return new Set({ myGames: 0, rivalGames: 0, setWon: null, stats: null });
    }

    public static create(props: SetProps): Result<Set> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.myGames, argumentName: "games won" },
            { argument: props.rivalGames, argumentName: "games lost" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Set>(guardResult.getErrorValue());
        }

        const set = new Set({
            ...props,
            setWon: props.setWon ?? null,
            stats: props.stats ?? null
        });

        return Result.ok<Set>(set);
    }
}
