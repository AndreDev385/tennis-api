import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface SetPlayerStatsProps {
    isDouble: boolean;
    pointsWon: number;
    pointsWonServing: number;
    pointsWonReturning: number;
    pointsLost: number;
    pointsLostReturning: number;
    pointsLostServing: number;
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    gamesWonServing: number;
    gamesLostServing: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    firstServIn: number;
    secondServIn: number;
    firstServWon: number;
    secondServWon: number;
    aces: number;
    dobleFaults: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    firstReturnWon: number;
    secondReturnWon: number;
    firstReturnWinner: number;
    secondReturnWinner: number;
    meshPointsWon: number;
    meshPointsLost: number;
    meshWinner: number;
    meshError: number;
    bckgPointsWon: number;
    bckgPointsLost: number;
    bckgWinner: number;
    bckgError: number;
}

export class SetPlayerStats extends ValueObject<SetPlayerStatsProps> {
    get isDouble(): boolean {
        return this.props.isDouble;
    }

    get firstServWon(): number {
        return this.props.firstServWon;
    }

    get secondServWon(): number {
        return this.props.secondServWon;
    }

    get firstReturnWon(): number {
        return this.props.firstReturnWon;
    }

    get secondReturnWon(): number {
        return this.props.secondReturnWon;
    }

    get firstReturnWinner(): number {
        return this.props.firstReturnWinner;
    }

    get secondReturnWinner(): number {
        return this.props.secondReturnWinner;
    }

    get pointsWon(): number {
        return this.props.pointsWon;
    }

    get pointsWonServing(): number {
        return this.props.pointsWonServing;
    }

    get gamesWonServing(): number {
        return this.props.gamesWonServing;
    }

    get gamesLostServing(): number {
        return this.props.gamesLostServing;
    }

    get pointsWonReturning(): number {
        return this.props.pointsWonReturning;
    }
    get pointsLost(): number {
        return this.props.pointsLost;
    }
    get pointsLostReturning(): number {
        return this.props.pointsLostReturning;
    }
    get pointsLostServing(): number {
        return this.props.pointsLostServing;
    }
    get saveBreakPtsChances(): number {
        return this.props.saveBreakPtsChances;
    }
    get breakPtsSaved(): number {
        return this.props.breakPtsSaved;
    }
    get pointsWinnedFirstServ(): number {
        return this.props.pointsWinnedFirstServ;
    }
    get pointsWinnedSecondServ(): number {
        return this.props.pointsWinnedSecondServ;
    }
    get firstServIn(): number {
        return this.props.firstServIn;
    }
    get secondServIn(): number {
        return this.props.secondServIn;
    }
    get aces(): number {
        return this.props.aces;
    }
    get dobleFaults(): number {
        return this.props.dobleFaults;
    }
    get pointsWinnedFirstReturn(): number {
        return this.props.pointsWinnedFirstReturn;
    }
    get pointsWinnedSecondReturn(): number {
        return this.props.pointsWinnedSecondReturn;
    }
    get firstReturnIn(): number {
        return this.props.firstReturnIn;
    }
    get secondReturnIn(): number {
        return this.props.secondReturnIn;
    }
    get firstReturnOut(): number {
        return this.props.firstReturnOut;
    }
    get secondReturnOut(): number {
        return this.props.secondReturnOut;
    }
    get meshPointsWon(): number {
        return this.props.meshPointsWon;
    }
    get meshPointsLost(): number {
        return this.props.meshPointsLost;
    }
    get meshWinner(): number {
        return this.props.meshWinner;
    }

    get meshError(): number {
        return this.props.meshError;
    }

    get bckgPointsWon(): number {
        return this.props.bckgPointsWon;
    }

    get bckgPointsLost(): number {
        return this.props.bckgPointsLost;
    }

    get bckgWinner(): number {
        return this.props.bckgWinner;
    }

    get bckgError(): number {
        return this.props.bckgError;
    }

    private constructor(props: SetPlayerStatsProps) {
        super(props);
    }

    public static create(props: SetPlayerStatsProps): Result<SetPlayerStats> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.isDouble, argumentName: "" },
            { argument: props.pointsWon, argumentName: "" },
            { argument: props.pointsWonServing, argumentName: "" },
            { argument: props.pointsWonReturning, argumentName: "" },
            { argument: props.pointsLost, argumentName: "" },
            { argument: props.pointsLostReturning, argumentName: "" },
            { argument: props.pointsLostServing, argumentName: "" },
            { argument: props.saveBreakPtsChances, argumentName: "" },
            { argument: props.breakPtsSaved, argumentName: "" },
            { argument: props.gamesWonServing, argumentName: "" },
            { argument: props.gamesLostServing, argumentName: "" },
            { argument: props.pointsWinnedFirstServ, argumentName: "" },
            { argument: props.pointsWinnedSecondServ, argumentName: "" },
            { argument: props.firstServIn, argumentName: "" },
            { argument: props.secondServIn, argumentName: "" },
            { argument: props.firstServWon, argumentName: "" },
            { argument: props.secondServWon, argumentName: "" },
            { argument: props.aces, argumentName: "" },
            { argument: props.dobleFaults, argumentName: "" },
            { argument: props.pointsWinnedFirstReturn, argumentName: "" },
            { argument: props.pointsWinnedSecondReturn, argumentName: "" },
            { argument: props.firstReturnIn, argumentName: "" },
            { argument: props.secondReturnIn, argumentName: "" },
            { argument: props.firstReturnOut, argumentName: "" },
            { argument: props.secondReturnOut, argumentName: "" },
            { argument: props.firstReturnWon, argumentName: "" },
            { argument: props.secondReturnWon, argumentName: "" },
            { argument: props.firstReturnWinner, argumentName: "" },
            { argument: props.secondReturnWinner, argumentName: "" },
            { argument: props.meshPointsWon, argumentName: "" },
            { argument: props.meshPointsLost, argumentName: "" },
            { argument: props.meshWinner, argumentName: "" },
            { argument: props.meshError, argumentName: "" },
            { argument: props.bckgPointsWon, argumentName: "" },
            { argument: props.bckgPointsLost, argumentName: "" },
            { argument: props.bckgWinner, argumentName: "" },
            { argument: props.bckgError, argumentName: "" },
        ]);

        if (guard.isFailure) {
            return Result.fail<SetPlayerStats>(guard.getErrorValue());
        }

        return Result.ok<SetPlayerStats>(new SetPlayerStats(props));
    }
}
