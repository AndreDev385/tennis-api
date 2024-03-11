import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { PlayerId } from "../../league/domain/playerId";
import { TournamentId } from "./tournamentId";

type ParticipantTrackerProps = {
    playerId: PlayerId;
    tournamentId: TournamentId;
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
};

export class ParticipantTracker extends Entity<ParticipantTrackerProps> {
    get playerId(): PlayerId {
        return this.props.playerId;
    }

    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }

    get isDouble(): boolean {
        return this.props.isDouble;
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

    get gamesWonServing(): number {
        return this.props.gamesWonServing;
    }

    get gamesLostServing(): number {
        return this.props.gamesLostServing;
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

    get firstServWon(): number {
        return this.props.firstServWon;
    }

    get secondServWon(): number {
        return this.props.secondServWon;
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

    private constructor(props: ParticipantTrackerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ParticipantTrackerProps, id?: UniqueEntityID) {
        return Result.ok<ParticipantTracker>(new ParticipantTracker(props, id));
    }
}
