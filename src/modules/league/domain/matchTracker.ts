import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { MatchId } from "./matchId";
import { TrackerId } from "./matchTrackerId";
import { PlayerId } from "./playerId";
import { PlayerTracker } from "./playerTracker";

interface MatchTrackerProps {
    matchId: MatchId;

    me: PlayerTracker;
    partner?: PlayerTracker;

    gamesWonServing: number;
    gamesWonReturning: number;
    gamesLostServing: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;

    rivalPointsWinnedFirstServ?: number;
    rivalPointsWinnedSecondServ?: number;
    rivalFirstServIn?: number;
    rivalSecondServIn?: number;
    rivalPointsWinnedFirstReturn?: number;
    rivalPointsWinnedSecondReturn?: number;
    rivalFirstReturnIn?: number;
    rivalSecondReturnIn?: number;

    rivalAces?: number;
    rivalDobleFault?: number;
    rivalNoForcedErrors?: number;
    rivalWinners?: number;
    shortRallyWon?: number;
    mediumRallyWon?: number;
    longRallyWon?: number;
    shortRallyLost?: number;
    mediumRallyLost?: number;
    longRallyLost?: number;
}

export class MatchTracker extends Entity<MatchTrackerProps> {
    get trackerId(): TrackerId {
        return TrackerId.create(this._id).getValue();
    }

    get matchId(): MatchId {
        return this.props.matchId;
    }

    get me() {
        return this.props.me;
    }

    get partner() {
        return this.props.partner;
    }

    get gamesWonServing(): number {
        return this.props.gamesWonServing;
    }

    get gamesWonReturning(): number {
        return this.props.gamesWonReturning;
    }

    get gamesLostServing(): number {
        return this.props.gamesLostServing;
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

    public static createNewTracker(
        id: MatchId,
        playerId: PlayerId,
        partnerId?: PlayerId
    ): Result<MatchTracker> {
        const guard = Guard.againstNullOrUndefined(id, "match id");

        if (guard.isFailure) {
            return Result.fail<MatchTracker>(guard.getErrorValue());
        }

        const meOrError = PlayerTracker.createNewPlayerTracker(playerId);
        let partner: PlayerTracker;

        if (meOrError.isFailure) {
            return Result.fail(`${meOrError.getErrorValue()}`);
        }

        if (!!partnerId === true) {
            const partnerOrError =
                PlayerTracker.createNewPlayerTracker(partnerId);
            if (partnerOrError.isFailure) {
                return Result.fail(`${partnerOrError.getErrorValue()}`);
            }
            partner = partnerOrError.getErrorValue();
        }

        const instance = new MatchTracker({
            me: meOrError.getErrorValue(),
            matchId: id,
            gamesWonServing: 0,
            partner: partner,
            rivalAces: 0,
            longRallyWon: 0,
            rivalWinners: 0,
            breakPtsWinned: 0,
            gamesLostServing: 0,
            gamesWonReturning: 0,
            gamesLostReturning: 0,
            winBreakPtsChances: 0,
        });

        return Result.ok(instance);
    }

    public static create(
        props: MatchTrackerProps,
        id?: UniqueEntityID
    ): Result<MatchTracker> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.matchId, argumentName: "match id" },
            { argument: props.me, argumentName: "my statistics" },
            {
                argument: props.gamesWonServing,
                argumentName: "games won serving",
            },
            {
                argument: props.gamesWonReturning,
                argumentName: "games won returning",
            },
            {
                argument: props.gamesLostServing,
                argumentName: "games lost serving",
            },
            {
                argument: props.gamesLostReturning,
                argumentName: "games lost returning",
            },
            {
                argument: props.winBreakPtsChances,
                argumentName: "break points chances",
            },
            {
                argument: props.breakPtsWinned,
                argumentName: "break points won",
            },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<MatchTracker>(guardResult.getErrorValue());
        }

        const matchTracker = new MatchTracker(props, id);

        return Result.ok<MatchTracker>(matchTracker);
    }
}
