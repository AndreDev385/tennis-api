import { argv0 } from "process";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { PlayerId } from "./playerId";
import { PlayerTrackerId } from "./playerTrackerId";
import { SeasonId } from "./seasonId";

interface PlayerTrackerProps {
    playerId: PlayerId;
    seasonId: SeasonId;

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

    get seasonId(): SeasonId {
        return this.props.seasonId;
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
    get meshPointsWon(): number {
        return this.props.meshPointsWon;
    }
    get meshPointsLost(): number {
        return this.props.meshPointsLost;
    }
    get bckgPointsWon(): number {
        return this.props.bckgPointsWon;
    }
    get bckgPointsLost(): number {
        return this.props.bckgPointsLost;
    }
    get winners(): number {
        return this.props.winners;
    }
    get noForcedErrors(): number {
        return this.props.noForcedErrors;
    }

    private constructor(props: PlayerTrackerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static createNewPlayerTracker(
        playerId: PlayerId,
        seasonId: SeasonId
    ): Result<PlayerTracker> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: playerId, argumentName: "id de jugador" },
            { argument: seasonId, argumentName: "id de temporada" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        const result = PlayerTracker.create({
            seasonId,
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
            { argument: props.playerId, argumentName: "id de jugador" },
            { argument: props.seasonId, argumentName: "id de temporada" },
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

        const playerTracker = new PlayerTracker({
            ...props,
            pointsWinnedFirstServ: props.pointsWinnedFirstServ ?? 0,
            pointsWinnedSecondReturn: props.pointsWinnedSecondReturn ?? 0,
            pointsWinnedSecondServ: props.pointsWinnedSecondServ ?? 0,
            firstServIn: props.firstServIn ?? 0,
            secondServIn: props.secondServIn ?? 0,
            aces: props.aces ?? 0,
            dobleFaults: props.dobleFaults ?? 0,
            pointsWinnedFirstReturn: props.pointsWinnedFirstReturn ?? 0,
            firstReturnIn: props.firstReturnIn ?? 0,
            secondReturnIn: props.secondReturnIn ?? 0,
            meshPointsWon: props.meshPointsLost ?? 0,
            bckgPointsWon: props.bckgPointsWon ?? 0,
            meshPointsLost: props.meshPointsLost ?? 0,
            bckgPointsLost: props.bckgPointsLost ?? 0,
            winners: props.winners ?? 0,
            noForcedErrors: props.noForcedErrors ?? 0,
        }, id);

        return Result.ok<PlayerTracker>(playerTracker);
    }
}
