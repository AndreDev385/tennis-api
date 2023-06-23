import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { PlayerTrackerId } from "./playerTrackerId";

interface PlayerTrackerProps {
    pointsWon: number;
    pointsWonServing: number;
    pointsWonReturning: number;
    pointsLost: number;
    pointsLostReturning: number;
    pointsLostServing: number;
    saveBreakPtsChances: number;
    breakPtsSaved: number;
    pointsWinnedFirstServ?: number;
    pointsWinnedSecondServ?: number;
    firstServIn?: number;
    secondServIn?: number;
    aces?: number;
    dobleFaults?: number;
    pointsWinnedFirstReturn?: number;
    pointsWinnedSecondReturn?: number;
    firstReturnIn?: number;
    secondReturnIn?: number;
    meshPointsWon?: number;
    meshPointsLost?: number;
    bckgPointsWon?: number;
    bckgPointsLost?: number;
    winners?: number;
    noForcedErrors?: number;
}

export class PlayerTracker extends Entity<PlayerTrackerProps> {
    get playerTrackerId(): PlayerTrackerId {
        return PlayerTrackerId.create(this._id).getValue();
    }

    get pointsWon(): number {
        return this.props.pointsWon;
    }

    get pointsWonServing(): number {
        return this.props.pointsWonServing;
    }

    get pointsWonReturning(): number {
        return this.props.pointsWonReturning;
    }
    get pointsLost(): number {
        return this.props.pointsWonReturning;
    }
    get pointsLostReturning(): number {
        return this.props.pointsWonReturning;
    }
    get pointsLostServing(): number {
        return this.props.pointsWonReturning;
    }
    get saveBreakPtsChances(): number {
        return this.props.pointsWonReturning;
    }
    get breakPtsSaved(): number {
        return this.props.pointsWonReturning;
    }
    get pointsWinnedFirstServ(): number {
        return this.props.pointsWonReturning;
    }
    get pointsWinnedSecondServ(): number {
        return this.props.pointsWonReturning;
    }
    get firstServIn(): number {
        return this.props.pointsWonReturning;
    }
    get secondServIn(): number {
        return this.props.pointsWonReturning;
    }
    get aces(): number {
        return this.props.pointsWonReturning;
    }
    get dobleFaults(): number {
        return this.props.pointsWonReturning;
    }
    get pointsWinnedFirstReturn(): number {
        return this.props.pointsWonReturning;
    }
    get pointsWinnedSecondReturn(): number {
        return this.props.pointsWonReturning;
    }
    get firstReturnIn(): number {
        return this.props.pointsWonReturning;
    }
    get secondReturnIn(): number {
        return this.props.pointsWonReturning;
    }
    get meshPointsWon(): number {
        return this.props.pointsWonReturning;
    }
    get meshPointsLost(): number {
        return this.props.pointsWonReturning;
    }
    get bckgPointsWon(): number {
        return this.props.pointsWonReturning;
    }
    get bckgPointsLost(): number {
        return this.props.pointsWonReturning;
    }
    get winners(): number {
        return this.props.pointsWonReturning;
    }
    get noForcedErrors(): number {
        return this.props.pointsWonReturning;
    }

    public static create(
        props: PlayerTrackerProps,
        id?: UniqueEntityID
    ): Result<PlayerTracker> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.pointsWon, argumentName: "" },
            { argument: props.pointsWonServing, argumentName: "" },
            { argument: props.pointsWonReturning, argumentName: "" },
            { argument: props.pointsLost, argumentName: "" },
            { argument: props.pointsLostReturning, argumentName: "" },
            { argument: props.pointsLostServing, argumentName: "" },
            { argument: props.saveBreakPtsChances, argumentName: "" },
            { argument: props.breakPtsSaved, argumentName: "" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<PlayerTracker>(guardResult.getErrorValue());
        }

        const playerTracker = new PlayerTracker(props, id);

        return Result.ok<PlayerTracker>(playerTracker);
    }
}
