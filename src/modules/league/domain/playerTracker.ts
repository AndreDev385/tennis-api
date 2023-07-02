import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { PlayerId } from "./playerId";
import { PlayerTrackerId } from "./playerTrackerId";

interface PlayerTrackerProps {
    playerId: PlayerId;
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

    get playerId(): PlayerId {
        return this.props.playerId;
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

    public static createNewPlayerTracker(
        playerId: PlayerId
    ): Result<PlayerTracker> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: playerId, argumentName: "player id" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        const result = PlayerTracker.create({
            playerId,
            pointsWon: 0,
            pointsWonServing: 0,
            pointsWonReturning: 0,
            pointsLost: 0,
            pointsLostServing: 0,
            pointsLostReturning: 0,
            saveBreakPtsChances: 0,
            breakPtsSaved: 0,
        });

        if (result.isFailure) {
            return Result.fail<PlayerTracker>(`${result.getErrorValue()}`);
        }

        return Result.ok(result.getValue());
    }

    public static create(
        props: PlayerTrackerProps,
        id?: UniqueEntityID
    ): Result<PlayerTracker> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.playerId, argumentName: "player id" },
            { argument: props.pointsWon, argumentName: "puntos ganados" },
            {
                argument: props.pointsWonServing,
                argumentName: "puntos ganados con el servicio",
            },
            {
                argument: props.pointsWonReturning,
                argumentName: "puntosn ganados devolviendo",
            },
            { argument: props.pointsLost, argumentName: "puntos perdidos" },
            {
                argument: props.pointsLostReturning,
                argumentName: "puntos perdidos devolviendo",
            },
            {
                argument: props.pointsLostServing,
                argumentName: "puntos perdidos con el servicio",
            },
            {
                argument: props.saveBreakPtsChances,
                argumentName: "chances de salvar un break point",
            },
            {
                argument: props.breakPtsSaved,
                argumentName: "break points salvado",
            },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<PlayerTracker>(guardResult.getErrorValue());
        }

        const playerTracker = new PlayerTracker(props, id);

        return Result.ok<PlayerTracker>(playerTracker);
    }
}
