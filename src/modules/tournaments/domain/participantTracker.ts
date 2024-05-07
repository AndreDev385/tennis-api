import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ParticipantId } from "./participantId";
import { ParticipantTrackerId } from "./participantTrackerId";
import { TournamentId } from "./tournamentId";
import { TournamentMatchId } from "./tournamentMatchId";

type ParticipantTrackerProps = {
    participantId: ParticipantId;
    tournamentId: TournamentId;
    matchId: TournamentMatchId;

    isDouble: boolean;

    saveBreakPtsChances: number;
    breakPtsSaved: number;
    breakPtsChances: number;
    breakPts: number;
    gamesWonServing: number;
    gamesLostServing: number;
    pointsWinnedFirstServ: number;
    pointsWinnedSecondServ: number;
    firstServIn: number;
    secondServIn: number;
    aces: number;
    dobleFaults: number;
    firstServWon: number;
    secondServWon: number;
    pointsWinnedFirstReturn: number;
    pointsWinnedSecondReturn: number;
    firstReturnWon: number;
    secondReturnWon: number;
    firstReturnWinner: number;
    secondReturnWinner: number;
    firstReturnIn: number;
    secondReturnIn: number;
    firstReturnOut: number;
    secondReturnOut: number;
    gamesWonReturning: number;
    gamesLostReturning: number;
    meshPointsWon: number;
    meshPointsLost: number;
    meshWinner: number;
    meshError: number;
    bckgPointsWon: number;
    bckgPointsLost: number;
    bckgWinner: number;
    bckgError: number;
    shortRallyWon: number;
    mediumRallyWon: number;
    longRallyWon: number;
    shortRallyLost: number;
    mediumRallyLost: number;
    longRallyLost: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ParticipantTracker extends Entity<ParticipantTrackerProps> {
    get participantTrackerId() {
        return ParticipantTrackerId.create(this._id).getValue();
    }

    get participantId(): ParticipantId {
        return this.props.participantId;
    }

    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }

    get matchId(): TournamentMatchId {
        return this.props.matchId;
    }

    get isDouble(): boolean {
        return this.props.isDouble;
    }

    get saveBreakPtsChances(): number {
        return this.props.saveBreakPtsChances;
    }
    get breakPtsSaved(): number {
        return this.props.breakPtsSaved;
    }
    get breakPtsChances(): number {
        return this.props.breakPtsChances;
    }
    get breakPts(): number {
        return this.props.breakPts;
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
    get aces(): number {
        return this.props.aces;
    }
    get dobleFaults(): number {
        return this.props.dobleFaults;
    }
    get firstServWon(): number {
        return this.props.firstServWon;
    }
    get secondServWon(): number {
        return this.props.secondServWon;
    }
    get pointsWinnedFirstReturn(): number {
        return this.props.pointsWinnedFirstReturn;
    }
    get pointsWinnedSecondReturn(): number {
        return this.props.pointsWinnedSecondReturn;
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
    get gamesWonReturning(): number {
        return this.props.gamesWonReturning;
    }
    get gamesLostReturning(): number {
        return this.props.gamesLostReturning;
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
    get createdAt(): Date {
        return this.props.createdAt!;
    }
    get updatedAt(): Date {
        return this.props.updatedAt!;
    }

    private constructor(props: ParticipantTrackerProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static newEmptyTracker(
        isDouble: boolean,
        matchId: TournamentMatchId,
        tournamentId: TournamentId,
        participantId: ParticipantId
    ) {
        return new ParticipantTracker({
            isDouble,
            matchId,
            tournamentId,
            participantId,
            breakPts: 0,
            breakPtsSaved: 0,
            breakPtsChances: 0,
            saveBreakPtsChances: 0,
            firstServIn: 0,
            secondServIn: 0,
            aces: 0,
            dobleFaults: 0,
            firstServWon: 0,
            secondServWon: 0,
            pointsWinnedFirstServ: 0,
            pointsWinnedSecondServ: 0,
            gamesWonServing: 0,
            gamesLostServing: 0,
            gamesWonReturning: 0,
            gamesLostReturning: 0,
            // return
            firstReturnWon: 0,
            secondReturnWon: 0,
            firstReturnWinner: 0,
            secondReturnWinner: 0,
            firstReturnIn: 0,
            secondReturnIn: 0,
            firstReturnOut: 0,
            secondReturnOut: 0,
            pointsWinnedFirstReturn: 0,
            pointsWinnedSecondReturn: 0,
            // places
            meshPointsWon: 0,
            meshPointsLost: 0,
            meshWinner: 0,
            meshError: 0,
            bckgPointsWon: 0,
            bckgPointsLost: 0,
            bckgWinner: 0,
            bckgError: 0,
            // rally
            shortRallyWon: 0,
            shortRallyLost: 0,
            mediumRallyWon: 0,
            mediumRallyLost: 0,
            longRallyWon: 0,
            longRallyLost: 0,
        });
    }

    public static create(props: ParticipantTrackerProps, id?: UniqueEntityID) {
        return Result.ok<ParticipantTracker>(
            new ParticipantTracker(
                {
                    ...props,
                    createdAt: props.createdAt ?? new Date(),
                    updatedAt: props.updatedAt ?? new Date(),
                },
                id
            )
        );
    }
}
