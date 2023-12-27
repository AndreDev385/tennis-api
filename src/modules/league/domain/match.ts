import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { MatchCancelled } from "./events/matchCancelled";
import { MatchCreated } from "./events/matchCreated";
import { MatchFinished } from "./events/matchFinished";
import { MatchGoesLive } from "./events/matchGoesLive";
import { MatchPaused } from "./events/matchPaused";
import { Mode } from "./gameMode";
import { GamesPerSet } from "./gamesPerSet";
import { MatchId } from "./matchId";
import { MatchStatus, MatchStatuses } from "./matchStatus";
import { MatchTracker } from "./matchTracker";
import { Player } from "./player";
import { SetQuantity } from "./setQuantity";
import { Sets } from "./sets";
import { Surface } from "./surface";

interface MatchProps {
    clashId: UniqueEntityID;
    mode: Mode;
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
    superTieBreak: boolean;
    category: Category;
    address?: string | null;
    sets: Sets;
    surface: Surface;
    player1: Player;
    player2: string;
    player3?: Player | null;
    player4?: string | null;
    tracker?: MatchTracker | null;
    status?: MatchStatus;
    matchWon?: boolean | null;
}

export class Match extends AggregateRoot<MatchProps> {
    get matchId(): MatchId {
        return MatchId.create(this._id).getValue();
    }

    get clashId(): UniqueEntityID {
        return this.props.clashId;
    }

    get mode(): Mode {
        return this.props.mode;
    }

    get category(): Category {
        return this.props.category;
    }

    get setsQuantity(): SetQuantity {
        return this.props.setsQuantity;
    }

    get sets(): Sets {
        return this.props.sets;
    }

    get gamesPerSet(): GamesPerSet {
        return this.props.gamesPerSet;
    }

    get superTieBreak(): boolean {
        return this.props.superTieBreak;
    }

    get address(): string | null {
        return this.props.address!;
    }

    get surface(): Surface {
        return this.props.surface;
    }

    get player1(): Player {
        return this.props.player1;
    }

    get player2(): string {
        return this.props.player2;
    }

    get player3() {
        return this.props.player3;
    }

    get player4() {
        return this.props.player4;
    }

    get tracker() {
        return this.props.tracker;
    }

    get status(): MatchStatus {
        return this.props.status!
    }

    get matchWon(): boolean | undefined | null {
        return this.props.matchWon
    }

    private setMatchWon() {
        let setsWon = this.sets
            .getItems()
            .filter((set) => set.setWon == true);
        this.props.matchWon = (setsWon.length >= Math.floor(this.setsQuantity.value / 2) + 1)
    }

    public addTracker(tracker: MatchTracker) {
        this.props.tracker = tracker;
    }

    public goLive() {
        this.props.status = MatchStatus.createNew(MatchStatuses.Live)
        this.addDomainEvent(new MatchGoesLive(this));
    }

    public pauseMatch(tracker: MatchTracker, sets: Sets, superTieBreak: boolean) {
        this.props.superTieBreak = superTieBreak;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.props.status = MatchStatus.createNew(MatchStatuses.Paused)
        this.addDomainEvent(new MatchPaused(this));
    }

    public finishMatch(sets: Sets, tracker: MatchTracker, superTieBreak: boolean, matchWon: boolean | null) {
        this.props.superTieBreak = superTieBreak;
        this.props.status = MatchStatus.createNew(MatchStatuses.Finished)
        this.props.tracker = tracker;
        this.props.sets = sets;
        if (matchWon == null) {
            this.setMatchWon()
        } else {
            this.props.matchWon = matchWon;
        }
        this.addDomainEvent(new MatchFinished(this));
    }

    public cancelMatch(sets: Sets, tracker: MatchTracker, superTieBreak?: boolean, matchWon: boolean | null = null) {
        this.props.superTieBreak = superTieBreak || false;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.props.status = MatchStatus.createNew(MatchStatuses.Canceled)
        this.props.matchWon = matchWon;
        this.addDomainEvent(new MatchCancelled(this))
    }

    private constructor(props: MatchProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: MatchProps,
        id?: UniqueEntityID
    ): Result<Match> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.mode, argumentName: "modo" },
            { argument: props.clashId, argumentName: "clash id" },
            { argument: props.setsQuantity, argumentName: "cantidad de sets" },
            { argument: props.sets, argumentName: "sets" },
            { argument: props.player1, argumentName: "player 1" },
            { argument: props.player2, argumentName: "player 2" },
            { argument: props.gamesPerSet, argumentName: "juegos por set" },
            { argument: props.superTieBreak, argumentName: "super Tie-Break" },
            { argument: props.surface, argumentName: "superficie" },
            { argument: props.category, argumentName: "categoria" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Match>(guardResult.getErrorValue());
        }

        const isNewMatch = !!id == false;

        const match = new Match(
            {
                ...props,
                status: props.status ?? MatchStatus.createNew(MatchStatuses.Waiting),
                matchWon: props.matchWon ?? null,
                address: props.address ?? null
            },
            id
        );

        if (isNewMatch) {
            match.addDomainEvent(new MatchCreated(match));
        }

        return Result.ok<Match>(match);
    }
}
