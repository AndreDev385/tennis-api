import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { SetStats } from "./setStats";

interface SetProps {
    myGames: number;
    rivalGames: number;
    tiebreak: boolean;
    superTiebreak: boolean;
    myTiebreakPoints: number;
    rivalTiebreakPoints: number;
    setWon: boolean | null;
    stats: any | null;
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

    get tiebreak(): boolean {
        return this.props.tiebreak;
    }

    get superTiebreak(): boolean {
        return this.props.superTiebreak;
    }

    get myTiebreakPoints(): number {
        return this.props.myTiebreakPoints;
    }

    get rivalTiebreakPoints(): number {
        return this.props.rivalTiebreakPoints;
    }

    private constructor(props: SetProps) {
        super(props);
    }

    public static createDefaultLeague(): Set {
        return new Set({
            myGames: 0,
            rivalGames: 0,
            setWon: null,
            stats: null,
            tiebreak: false,
            superTiebreak: false,
            myTiebreakPoints: 0,
            rivalTiebreakPoints: 0,
        });
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
            stats: props.stats ?? null,
            tiebreak: props.tiebreak ?? false,
            superTiebreak: props.superTiebreak ?? false,
            myTiebreakPoints: props.myTiebreakPoints ?? 0,
            rivalTiebreakPoints: props.rivalTiebreakPoints ?? 0,
        });

        return Result.ok<Set>(set);
    }
}
