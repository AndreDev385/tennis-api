import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { ClashId } from "./clashId";
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
}

export class Match extends Entity<MatchProps> {
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

    get matchWon(): boolean {
        if (this.isFinish) {
            let setsWon = 0
            for (const set of this.sets.getItems()) {
                if (set.setWon) {
                    setsWon++;
                }
            }

            if (setsWon > (Math.floor(this.setsQuantity.value / 2) + 1)) {
                return true;
            }
            return false
        }
    }

    public addTracker(tracker: MatchTracker) {
        this.props.tracker = tracker;
    }

    public goLive() {
        this.props.isLive = true;
    }

    public finishMatch() {
        this.props.isFinish = true;
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

        const match = new Match(
            {
                ...props,
                isLive: props.isLive || false,
                isFinish: props.isFinish || false,
            },
            id
        );

        return Result.ok<Match>(match);
    }
}
