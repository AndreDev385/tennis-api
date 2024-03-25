import { WatchedList } from "../../../shared/domain/WatchedList";
import { Contest } from "./contest";

export class Contests extends WatchedList<Contest> {
    private constructor(initialContests: Array<Contest>) {
        super(initialContests);
    }

    compareItems(a: Contest, b: Contest): boolean {
        throw new Error("Method not implemented.");
    }

    public static create(contests: Array<Contest> = []): Contests {
        return new Contests(contests);
    }
}
