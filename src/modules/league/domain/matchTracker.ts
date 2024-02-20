import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { MatchId } from "./matchId";
import { TrackerId } from "./matchTrackerId";
import { PlayerId } from "./playerId";
import { PlayerTracker } from "./playerTracker";
import { SeasonId } from "./seasonId";

interface MatchTrackerProps {
    matchId: MatchId;

    me: PlayerTracker;
    partner?: PlayerTracker | null;

    gamesWonReturning: number;
    gamesLostReturning: number;
    winBreakPtsChances: number;
    breakPtsWinned: number;

    rivalFirstServWon: number;
    rivalSecondServWon: number;
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

    // internal gets
    get gamesWonReturning(): number {
        return this.gamesWonReturning;
    }
    get gamesLostReturning(): number {
        return this.gamesLostReturning;
    }
    get winBreakPtsChances(): number {
        return this.winBreakPtsChances;
    }
    get breakPtsWinned(): number {
        return this.breakPtsWinned;
    }

    get rivalFirstServWon(): number {
        return this.rivalFirstServWon;
    }
    get rivalSecondServWon(): number {
        return this.rivalSecondServWon;
    }
    get rivalPointsWinnedFirstServ(): number {
        return this.rivalPointsWinnedFirstServ;
    }
    get rivalPointsWinnedSecondServ(): number {
        return this.rivalPointsWinnedSecondServ;
    }
    get rivalFirstServIn(): number {
        return this.rivalFirstServIn;
    }
    get rivalSecondServIn(): number {
        return this.rivalSecondServIn;
    }
    get rivalPointsWinnedFirstReturn(): number {
        return this.rivalPointsWinnedFirstReturn;
    }
    get rivalPointsWinnedSecondReturn(): number {
        return this.rivalPointsWinnedSecondReturn;
    }
    get rivalFirstReturnIn(): number {
        return this.rivalFirstReturnIn;
    }
    get rivalSecondReturnIn(): number {
        return this.rivalSecondReturnIn;
    }

    get rivalAces(): number {
        return this.rivalAces;
    }
    get rivalDobleFault(): number {
        return this.rivalDobleFault;
    }
    get rivalNoForcedErrors(): number {
        return this.rivalNoForcedErrors;
    }
    get rivalWinners(): number {
        return this.rivalWinners;
    }
    get shortRallyWon(): number {
        return this.shortRallyWon;
    }
    get mediumRallyWon(): number {
        return this.mediumRallyWon;
    }
    get longRallyWon(): number {
        return this.longRallyWon;
    }
    get shortRallyLost(): number {
        return this.shortRallyLost;
    }
    get mediumRallyLost(): number {
        return this.mediumRallyLost;
    }
    get longRallyLost(): number {
        return this.longRallyLost;
    }
    // end internal gets

    // player tracker results
    get gamesWonServing(): number {
        if (this.partner) {
            return this.me.gamesWonServing + this.partner.gamesWonServing;
        }
        return this.me.gamesWonServing;
    }
    get gamesLostServing(): number {
        if (this.partner) {
            return this.me.gamesLostServing + this.partner.gamesLostServing;
        }
        return this.me.gamesLostServing;
    }
    get pointsWinnedFirstServ(): number {
        if (this.partner) {
            return (
                this.me.pointsWinnedFirstServ +
                this.partner.pointsWinnedFirstServ
            );
        }
        return this.me.pointsWinnedFirstServ;
    }
    get pointsWinnedSecondServ(): number {
        if (this.partner) {
            return (
                this.me.pointsWinnedSecondServ +
                this.partner.pointsWinnedSecondServ
            );
        }
        return this.me.pointsWinnedSecondServ;
    }
    get firstServIn(): number {
        if (this.partner) {
            return this.me.firstServIn + this.partner.firstServIn;
        }
        return this.me.firstServIn;
    }
    get secondServIn(): number {
        if (this.partner) {
            return this.me.secondServIn + this.partner.secondServIn;
        }
        return this.me.secondServIn;
    }
    get firstServWon(): number {
        if (this.partner) {
            return this.me.firstServWon + this.partner.firstServWon;
        }
        return this.me.firstServWon;
    }
    get secondServWon(): number {
        if (this.partner) {
            return this.me.secondServWon + this.partner.secondServWon;
        }
        return this.me.secondServWon;
    }
    get aces(): number {
        if (this.partner) {
            return this.me.aces + this.partner.aces;
        }
        return this.me.aces;
    }
    get dobleFaults(): number {
        if (this.partner) {
            return this.me.dobleFaults + this.partner.dobleFaults;
        }
        return this.me.dobleFaults;
    }
    get pointsWinnedFirstReturn(): number {
        if (this.partner) {
            return (
                this.me.pointsWinnedFirstReturn +
                this.partner.pointsWinnedFirstReturn
            );
        }
        return this.me.pointsWinnedFirstReturn;
    }
    get pointsWinnedSecondReturn(): number {
        if (this.partner) {
            return (
                this.me.pointsWinnedSecondReturn +
                this.partner.pointsWinnedSecondReturn
            );
        }
        return this.me.pointsWinnedSecondReturn;
    }
    get firstReturnIn(): number {
        if (this.partner) {
            return this.me.firstReturnIn + this.partner.firstReturnIn;
        }
        return this.me.firstReturnIn;
    }
    get secondReturnIn(): number {
        if (this.partner) {
            return this.me.secondReturnIn + this.partner.secondReturnIn;
        }
        return this.me.secondReturnIn;
    }
    get firstReturnOut(): number {
        if (this.partner) {
            return this.me.firstReturnOut + this.partner.firstReturnOut;
        }
        return this.me.firstReturnOut;
    }
    get secondReturnOut(): number {
        if (this.partner) {
            return this.me.secondReturnOut + this.partner.secondReturnOut;
        }
        return this.me.secondReturnOut;
    }
    get firstReturnWon(): number {
        if (this.partner) {
            return this.me.firstReturnWon + this.partner.firstReturnWon;
        }
        return this.me.firstReturnWon;
    }
    get secondReturnWon(): number {
        if (this.partner) {
            return this.me.secondReturnWon + this.partner.secondReturnWon;
        }
        return this.me.secondReturnWon;
    }
    get firstReturnWinner(): number {
        if (this.partner) {
            return this.me.firstReturnWinner + this.partner.firstReturnWinner;
        }
        return this.me.firstReturnWinner;
    }
    get secondReturnWinner(): number {
        if (this.partner) {
            return this.me.secondReturnWinner + this.partner.secondReturnWinner;
        }
        return this.me.secondReturnWinner;
    }
    get meshPointsWon(): number {
        if (this.partner) {
            return this.me.meshPointsWon + this.partner.meshPointsWon;
        }
        return this.me.meshPointsWon;
    }
    get meshPointsLost(): number {
        if (this.partner) {
            return this.me.meshPointsLost + this.partner.meshPointsLost;
        }
        return this.me.meshPointsLost;
    }
    get meshWinner(): number {
        if (this.partner) {
            return this.me.meshWinner + this.partner.meshWinner;
        }
        return this.me.meshWinner;
    }
    get meshError(): number {
        if (this.partner) {
            return this.me.meshError + this.partner.meshError;
        }
        return this.me.meshError;
    }
    get bckgPointsWon(): number {
        if (this.partner) {
            return this.me.bckgPointsWon + this.partner.bckgPointsWon;
        }
        return this.me.bckgPointsWon;
    }
    get bckgPointsLost(): number {
        if (this.partner) {
            return this.me.bckgPointsLost + this.partner.bckgPointsLost;
        }
        return this.me.bckgPointsLost;
    }
    get bckgWinner(): number {
        if (this.partner) {
            return this.me.bckgWinner + this.partner.bckgWinner;
        }
        return this.me.bckgWinner;
    }
    get bckgError(): number {
        if (this.partner) {
            return this.me.bckgError + this.partner.bckgError;
        }
        return this.me.bckgError;
    }
    // end player tracker results

    private constructor(props: MatchTrackerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static createNewTracker(
        id: MatchId,
        seasonId: SeasonId,
        playerId: PlayerId,
        isDouble: boolean,
        partnerId?: PlayerId
    ): Result<MatchTracker> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: id, argumentName: "matchId" },
            { argument: seasonId, argumentName: "seasonId" },
            { argument: playerId, argumentName: "playerId" },
            { argument: isDouble, argumentName: "isDouble" },
        ]);

        if (guard.isFailure) {
            return Result.fail<MatchTracker>(guard.getErrorValue());
        }

        const meOrError = PlayerTracker.createNewPlayerTracker(
            playerId,
            seasonId,
            isDouble
        );

        if (meOrError.isFailure) {
            return Result.fail(`${meOrError.getErrorValue()}`);
        }

        let partner: PlayerTracker | null = null;
        if (!!partnerId === true) {
            const partnerOrError = PlayerTracker.createNewPlayerTracker(
                partnerId!,
                seasonId,
                isDouble
            );
            if (partnerOrError.isFailure) {
                return Result.fail(`${partnerOrError.getErrorValue()}`);
            }
            partner = partnerOrError.getValue();
        }

        const instance = new MatchTracker({
            matchId: id,
            me: meOrError.getValue(),
            partner,
            gamesWonReturning: 0,
            gamesLostReturning: 0,
            winBreakPtsChances: 0,
            breakPtsWinned: 0,

            rivalPointsWinnedFirstServ: 0,
            rivalPointsWinnedSecondServ: 0,
            rivalFirstServIn: 0,
            rivalSecondServIn: 0,
            rivalFirstServWon: 0,
            rivalSecondServWon: 0,

            rivalPointsWinnedFirstReturn: 0,
            rivalPointsWinnedSecondReturn: 0,
            rivalFirstReturnIn: 0,
            rivalSecondReturnIn: 0,

            rivalAces: 0,
            rivalDobleFault: 0,
            rivalNoForcedErrors: 0,
            rivalWinners: 0,

            shortRallyWon: 0,
            mediumRallyWon: 0,
            longRallyWon: 0,
            shortRallyLost: 0,
            mediumRallyLost: 0,
            longRallyLost: 0,
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
                argument: props.gamesWonReturning,
                argumentName: "games won returning",
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
