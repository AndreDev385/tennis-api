import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { MatchId } from "./matchId";

interface SetProps {
    matchId: MatchId;
    myGames: number;
    rivalGames: number;
    setWon: boolean;
}

export class Set extends ValueObject<SetProps> {
    get myGames(): number {
        return this.props.myGames;
    }

    get rivalGames(): number {
        return this.props.rivalGames;
    }

    get setWon(): boolean {
        return this.props.setWon;
    }

    get matchId(): MatchId {
        return this.props.matchId;
    }

    public static create(props: SetProps): Result<Set> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.matchId, argumentName: "matchId" },
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
