import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
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
}

export class Match extends Entity<MatchProps> {
    get matchId(): MatchId {
        return MatchId.create(this._id).getValue();
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

    public addTracker(tracker: MatchTracker) {
        this.props.tracker = tracker;
    }

    public static create(
        props: MatchProps,
        id?: UniqueEntityID
    ): Result<Match> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.mode, argumentName: "modo" },
            { argument: props.setsQuantity, argumentName: "cantidad de sets" },
            { argument: props.sets, argumentName: "sets" },
            //{ argument: props.address, argumentName: "modo" },
            { argument: props.player1, argumentName: "player 1" },
            { argument: props.player2, argumentName: "player 2" },
            { argument: props.gamesPerSet, argumentName: "juegos por set" },
            { argument: props.superTieBreak, argumentName: "super Tie-Break" },
            { argument: props.surface, argumentName: "superficie" },
            { argument: props.tracker, argumentName: "estadisticas" },
            { argument: props.category, argumentName: "categoria" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Match>(guardResult.getErrorValue());
        }

        const match = new Match(props, id);

        return Result.ok<Match>(match);
    }
}
