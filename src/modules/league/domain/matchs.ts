import { WatchedList } from "../../../shared/domain/WatchedList";
import { Match } from "./match";

export class Matchs extends WatchedList<Match> {
    private constructor(initialMatch: Array<Match>) {
        super(initialMatch);
    }

    public compareItems(a: Match, b: Match): boolean {
        return a.equals(b)
    }

    public static create(matchs: Array<Match> = []): Matchs {
        return new Matchs(matchs);
    }
}
