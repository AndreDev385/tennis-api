import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface SetProps {
    myGames: number;
    rivalGames: number;
    setWon: boolean | null;
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

    private constructor(props: SetProps) {
        super(props);
    }

    public static createDefaultLeague(): Set {
        return new Set({ myGames: 0, rivalGames: 0, setWon: null });
    }

    public static create(props: SetProps): Result<Set> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.myGames, argumentName: "games won" },
            { argument: props.rivalGames, argumentName: "games lost" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Set>(guardResult.getErrorValue());
        }

        const set = new Set(props);

        return Result.ok<Set>(set);
    }
}
