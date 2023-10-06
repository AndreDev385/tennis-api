import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { ClashId } from "./clashId";
import { MatchCancelled } from "./events/matchCancelled";
import { MatchCreated } from "./events/matchCreated";
import { MatchFinished } from "./events/matchFinished";
import { MatchGoesLive } from "./events/matchGoesLive";
import { MatchPaused } from "./events/matchPaused";
import { Mode } from "./gameMode";
import { GamesPerSet } from "./gamesPerSet";
import { MatchId } from "./matchId";
import { MatchTracker } from "./matchTracker";
import { Player } from "./player";
import { SetQuantity } from "./setQuantity";
import { Sets } from "./sets";
import { Surface } from "./surface";

interface MatchProps {
    mode: Mode;
    clashId: ClashId;
    setsQuantity: SetQuantity;
    gamesPerSet: GamesPerSet;
    superTieBreak: boolean;
    category: Category;
    address?: string;
    sets: Sets;
    surface: Surface;
    player1: Player;
    player2: string;
    player3?: Player;
    player4?: string;
    tracker?: MatchTracker;
    isLive?: boolean;
    isFinish?: boolean;
    isCancelled?: boolean;
    isPaused?: boolean;
}

export class Match extends AggregateRoot<MatchProps> {
    get matchId(): MatchId {
        return MatchId.create(this._id).getValue();
    }

    get clashId(): ClashId {
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

    get address(): string {
        return this.props.address;
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

    get isLive(): boolean {
        return this.props.isLive;
    }

    get isFinish(): boolean {
        return this.props.isFinish;
    }

    get isCancelled(): boolean {
        return this.props.isCancelled;
    }

    get isPaused(): boolean {
        return this.props.isPaused;
    }

    get matchWon(): boolean {
        let setsWon = this.sets
            .getItems()
            .filter((set) => set.setWon == true);
        if (setsWon.length >= Math.floor(this.setsQuantity.value / 2) + 1) {
            return true;
        }
        return false;
    }

    public addTracker(tracker: MatchTracker) {
        this.props.tracker = tracker;
    }

    public goLive() {
        this.props.isPaused = false;
        this.props.isLive = true;
        this.addDomainEvent(new MatchGoesLive(this));
    }

    public pauseMatch(tracker: MatchTracker) {
        this.props.tracker = tracker;
        this.props.isLive = false;
        this.props.isPaused = true;
        this.addDomainEvent(new MatchPaused(this));
    }

    public finishMatch(sets: Sets, tracker: MatchTracker, superTieBreak: boolean) {
        this.props.superTieBreak = superTieBreak;
        this.props.isFinish = true;
        this.props.isLive = false;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.addDomainEvent(new MatchFinished(this));
    }

    public cancelMatch(sets: Sets, tracker: MatchTracker, superTieBreak?: boolean) {
        this.props.superTieBreak = superTieBreak || false;
        this.props.isFinish = true;
        this.props.isLive = false;
        this.props.tracker = tracker;
        this.props.sets = sets;
        this.props.isCancelled = true;
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
                isLive: props.isLive || false,
                isFinish: props.isFinish || false,
                isCancelled: props.isCancelled || false,
                isPaused: props.isPaused || false,
            },
            id
        );

        if (isNewMatch) {
            match.addDomainEvent(new MatchCreated(match));
        }

        return Result.ok<Match>(match);
    }
}
