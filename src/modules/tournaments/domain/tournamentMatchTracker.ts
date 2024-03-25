import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { PlayerTracker } from "../../league/domain/playerTracker";
import { TournamentMatchId } from "./tournamentMatchId";

export type TournamentMatchTrackerProps = {
    matchId: TournamentMatchId;
    player1: PlayerTracker;
    player2: PlayerTracker;
    player3?: PlayerTracker | null;
    player4?: PlayerTracker | null;
    shortRallyWon: number;
    shortRallyLost: number;
    mediumRallyWon: number;
    mediumRallyLost: number;
    longRallyWon: number;
    longRallyLost: number;
};

export class TournamentMatchTracker extends ValueObject<TournamentMatchTrackerProps> {
    get matchId(): TournamentMatchId {
        return this.props.matchId;
    }
    get player1(): PlayerTracker {
        return this.props.player1;
    }
    get player2(): PlayerTracker {
        return this.props.player2;
    }
    get player3(): PlayerTracker | null {
        return this.props.player3!;
    }
    get player4(): PlayerTracker | null {
        return this.props.player4!;
    }
    get shortRallyWon(): number {
        return this.props.shortRallyWon;
    }
    get shortRallyLost(): number {
        return this.props.shortRallyLost;
    }
    get mediumRallyWon(): number {
        return this.props.mediumRallyWon;
    }
    get mediumRallyLost(): number {
        return this.props.mediumRallyLost;
    }
    get longRallyWon(): number {
        return this.props.longRallyWon;
    }
    get longRallyLost(): number {
        return this.props.longRallyLost;
    }

    private constructor(props: TournamentMatchTrackerProps) {
        super(props);
    }

    public static create(props: TournamentMatchTrackerProps) {
        return Result.ok<TournamentMatchTrackerProps>(
            new TournamentMatchTracker(props)
        ).getValue();
    }
}
