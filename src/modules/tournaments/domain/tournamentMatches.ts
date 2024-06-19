import { WatchedList } from "../../../shared/domain/WatchedList";
import { TournamentMatchId } from "./tournamentMatchId";

export class TournamentMatchesIds extends WatchedList<TournamentMatchId> {
    compareItems(a: TournamentMatchId, b: TournamentMatchId): boolean {
        return a.equals(b);
    }

    private constructor(matches: Array<TournamentMatchId>) {
        super(matches);
    }

    public static create(matches: Array<TournamentMatchId>) {
        return new TournamentMatchesIds(matches);
    }
}
