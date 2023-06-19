import { WatchedList } from "../../../shared/domain/WatchedList";
import { Season } from "./season";

export class Seasons extends WatchedList<Season> {

    private constructor(initialMatch: Array<Season>) {
        super(initialMatch);
    }

    public compareItems(a: Season, b: Season): boolean {
        return a.equals(b)
    }

    public static create(seasons?: Array<Season>): Seasons {
        return new Seasons(seasons);
    }
}
