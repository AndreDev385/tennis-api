import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { SetPlayerStats } from "./playerSetStats";

interface SetStatsProps {
    me: SetPlayerStats;
    partner?: SetPlayerStats;
    gamesWonReturning: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;
    rivalPointsWinnedFirstServ: number;
    rivalPointsWinnedSecondServ: number;
    rivalFirstServIn: number;
    rivalSecondServIn: number;
    rivalPointsWinnedFirstReturn: number;
    rivalPointsWinnedSecondReturn: number;
    rivalFirstReturnIn: number;
    rivalSecondReturnIn: number;
    rivalAces: number;
    rivalDobleFault: number;
    rivalNoForcedErrors: number;
    rivalWinners: number;
    shortRallyWon: number;
    mediumRallyWon: number;
    longRallyWon: number;
    shortRallyLost: number;
    mediumRallyLost: number;
    longRallyLost: number;
}

export class SetStats extends ValueObject<SetStatsProps> {
    get me(): SetPlayerStats {
        return this.props.me;
    }
    get partner(): SetPlayerStats | undefined {
        return this.props.partner;
    }
    get gamesWonReturning(): number {
        return this.props.gamesWonReturning;
    }
    get gamesLostReturning(): number {
        return this.props.gamesLostReturning;
    }
    get winBreakPtsChances(): number {
        return this.props.winBreakPtsChances;
    }
    get breakPtsWinned(): number {
        return this.props.breakPtsWinned;
    }
    get rivalPointsWinnedFirstServ(): number {
        return this.props.rivalPointsWinnedFirstServ;
    }
    get rivalPointsWinnedSecondServ(): number {
        return this.props.rivalPointsWinnedSecondServ;
    }
    get rivalFirstServIn(): number {
        return this.props.rivalFirstServIn;
    }
    get rivalSecondServIn(): number {
        return this.props.rivalSecondServIn;
    }
    get rivalPointsWinnedFirstReturn(): number {
        return this.props.rivalPointsWinnedFirstReturn;
    }
    get rivalPointsWinnedSecondReturn(): number {
        return this.props.rivalPointsWinnedSecondReturn;
    }
    get rivalFirstReturnIn(): number {
        return this.props.rivalFirstReturnIn;
    }
    get rivalSecondReturnIn(): number {
        return this.props.rivalSecondReturnIn;
    }
    get rivalAces(): number {
        return this.props.rivalAces;
    }
    get rivalDobleFault(): number {
        return this.props.rivalDobleFault;
    }
    get rivalNoForcedErrors(): number {
        return this.props.rivalNoForcedErrors;
    }
    get rivalWinners(): number {
        return this.props.rivalWinners;
    }
    get shortRallyWon(): number {
        return this.props.shortRallyWon;
    }
    get mediumRallyWon(): number {
        return this.props.mediumRallyWon;
    }
    get longRallyWon(): number {
        return this.props.longRallyWon;
    }
    get shortRallyLost(): number {
        return this.props.shortRallyLost;
    }
    get mediumRallyLost(): number {
        return this.props.mediumRallyLost;
    }
    get longRallyLost(): number {
        return this.props.longRallyLost;
    }

    private constructor(props: SetStatsProps) {
        super(props);
    }

    public static create(props: SetStatsProps): Result<SetStats> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.me, argumentName: "jugador" },
            { argument: props.gamesWonReturning, argumentName: "" },
            { argument: props.gamesLostReturning, argumentName: "" },
            { argument: props.winBreakPtsChances, argumentName: "" },
            { argument: props.breakPtsWinned, argumentName: "" },
            { argument: props.rivalPointsWinnedFirstServ, argumentName: "" },
            { argument: props.rivalPointsWinnedSecondServ, argumentName: "" },
            { argument: props.rivalFirstServIn, argumentName: "" },
            { argument: props.rivalSecondServIn, argumentName: "" },
            { argument: props.rivalPointsWinnedFirstReturn, argumentName: "" },
            { argument: props.rivalPointsWinnedSecondReturn, argumentName: "" },
            { argument: props.rivalFirstReturnIn, argumentName: "" },
            { argument: props.rivalSecondReturnIn, argumentName: "" },
            { argument: props.rivalAces, argumentName: "" },
            { argument: props.rivalDobleFault, argumentName: "" },
            { argument: props.rivalNoForcedErrors, argumentName: "" },
            { argument: props.rivalWinners, argumentName: "" },
            { argument: props.shortRallyWon, argumentName: "" },
            { argument: props.mediumRallyWon, argumentName: "" },
            { argument: props.longRallyWon, argumentName: "" },
            { argument: props.shortRallyLost, argumentName: "" },
            { argument: props.mediumRallyLost, argumentName: "" },
            { argument: props.longRallyLost, argumentName: "" },
        ])

        if (guard.isFailure) {
            return Result.fail<SetStats>(guard.getErrorValue());
        }

        return Result.ok(new SetStats(props));
    }
}
