import { Entity } from "../../../shared/domain/Entity";
import { WatchedList } from "../../../shared/domain/WatchedList";
import { MatchId } from "./matchId";
import { MatchTracker } from "./matchTracker";
import { Player } from "./player";
import { Set } from "./set";

interface MatchProps {
    mode: string;
    setsQuantity: 1 | 3 | 5;
    gamesPerSet: 4 | 6 | 9;
    superTieBreak: boolean;
    address: string;
    sets: WatchedList<Set>;
    surface: string;
    player1: Player,
    player2: string,
    player3?: Player,
    player4?: string,
    tracker: MatchTracker;
}

export class Match extends Entity<MatchProps> {

    get id(): MatchId {
        return MatchId.create(this._id).getValue();
    }

    get mode(): string {
        return this.props.mode;
    }

    get setsQuantity() {
        return this.props.setsQuantity
    }

    get gamesPerSet() {
        return this.props.gamesPerSet;
    }

    get superTieBreak(): boolean {
        return this.props.superTieBreak;
    }

    get address(): string {
        return this.props.address;
    }

    get surface(): string {
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
}
