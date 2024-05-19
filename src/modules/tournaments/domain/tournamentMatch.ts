import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mode } from "../../league/domain/gameMode";
import { MatchStatus, MatchStatuses } from "../../league/domain/matchStatus";
import { Sets } from "../../league/domain/sets";
import { Surface } from "../../league/domain/surface";
import { ContestId } from "./contestId";
import { TournamentMatchFinished } from "./events/tournamentMatchFinished";
import { MatchInfo } from "./matchInfo";
import { Participant } from "./participant";
import { TournamentId } from "./tournamentId";
import { TournamentMatchId } from "./tournamentMatchId";
import { TournamentMatchTracker } from "./tournamentMatchTracker";
import { TournamentRules } from "./tournamentRules";

type TournamentMatchProps = {
    tournamentId: TournamentId;
    contestId: ContestId;
    rules: TournamentRules;
    mode: Mode;
    surface: Surface;
    sets: Sets;
    superTieBreak: boolean | null;
    player1: Participant;
    player2: Participant;
    player3?: Participant | null;
    player4?: Participant | null;
    tracker?: TournamentMatchTracker | null;
    status: MatchStatus;
    matchInfo?: MatchInfo;
    matchWon?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
};

export class TournamentMatch extends AggregateRoot<TournamentMatchProps> {
    get matchId(): TournamentMatchId {
        return TournamentMatchId.create(this._id).getValue();
    }

    get tournamentId(): TournamentId {
        return this.props.tournamentId;
    }

    get contestId(): ContestId {
        return this.props.contestId;
    }

    get rules(): TournamentRules {
        return this.props.rules;
    }

    get mode(): Mode {
        return this.props.mode;
    }

    get surface(): Surface {
        return this.props.surface;
    }

    get sets(): Sets {
        return this.props.sets;
    }

    get superTieBreak(): boolean | null {
        return this.props.superTieBreak;
    }

    get player1(): Participant {
        return this.props.player1;
    }

    get player2(): Participant {
        return this.props.player2;
    }

    get player3(): Participant | null {
        return this.props.player3!;
    }

    get player4(): Participant | null {
        return this.props.player4!;
    }

    get tracker(): TournamentMatchTracker | null {
        return this.props.tracker!;
    }

    get status(): MatchStatus {
        return this.props.status;
    }

    get matchInfo(): MatchInfo | undefined {
        return this.props.matchInfo;
    }

    get matchWon(): boolean | null {
        return this.props.matchWon!;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    get updatedAt(): Date {
        return this.props.updatedAt!;
    }

    private constructor(props: TournamentMatchProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TournamentMatchProps, id?: UniqueEntityID) {
        return Result.ok<TournamentMatch>(new TournamentMatch(props, id));
    }

    private setMatchWon() {
        let setsWon = this.sets.getItems().filter((set) => set.setWon == true);
        this.props.matchWon =
            setsWon.length >= Math.floor(this.rules.setsQuantity.value / 2) + 1;
    }

    public addTracker(tracker: TournamentMatchTracker) {
        this.props.tracker = tracker;
    }

    public goLive() {
        this.props.status = MatchStatus.createNew(MatchStatuses.Live);
        this.props.updatedAt = new Date();
    }

    public pauseMatch(
        tracker: TournamentMatchTracker,
        sets: Sets,
        superTieBreak: boolean | null,
        matchInfo: MatchInfo
    ) {
        this.props.matchWon = null;
        this.props.superTieBreak = superTieBreak;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.props.status = MatchStatus.createNew(MatchStatuses.Paused);
        this.props.matchInfo = matchInfo;
        this.props.updatedAt = new Date();
    }

    public finishMatch(
        sets: Sets,
        tracker: TournamentMatchTracker,
        superTieBreak: boolean,
        matchWon: boolean | null,
        matchInfo: MatchInfo,
    ) {
        this.props.superTieBreak = superTieBreak;
        this.props.status = MatchStatus.createNew(MatchStatuses.Finished);
        this.props.tracker = tracker;
        this.props.sets = sets;
        if (matchWon == null) {
            this.setMatchWon();
        } else {
            this.props.matchWon = matchWon;
        }
        this.props.matchInfo = matchInfo;
        this.props.updatedAt = new Date();
        this.addDomainEvent(new TournamentMatchFinished(this))
    }

    public cancelMatch(
        sets: Sets,
        tracker: TournamentMatchTracker,
        matchInfo: MatchInfo,
        superTieBreak: boolean | null,
        matchWon: boolean | null = null
    ) {
        this.props.superTieBreak = superTieBreak;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.props.status = MatchStatus.createNew(MatchStatuses.Canceled);
        this.props.matchWon = matchWon;
        this.props.matchInfo = matchInfo;
        this.props.updatedAt = new Date();
        this.addDomainEvent(new TournamentMatchFinished(this))
    }
}
