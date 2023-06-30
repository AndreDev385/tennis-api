import { WatchedList } from "../../../shared/domain/WatchedList";
import { Set } from "./set";

export class Sets extends WatchedList<Set> {
    private constructor(initialSets: Array<Set>) {
        super(initialSets);
    }

    compareItems(a: Set, b: Set): boolean {
        return a.equals(b);
    }

    public static createDefaultLeague(): Sets {
        return new Sets([
            Set.createDefaultLeague(),
            Set.createDefaultLeague(),
            Set.createDefaultLeague(),
        ]);
    }

    public static create(seasons?: Array<Set>): Sets {
        return new Sets(seasons);
    }
}
