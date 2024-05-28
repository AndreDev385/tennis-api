import { WatchedList } from "../../../shared/domain/WatchedList";
import { Inscribed } from "./inscribed";

export class InscribedList extends WatchedList<Inscribed> {
    compareItems(a: Inscribed, b: Inscribed): boolean {
        return a.equals(b);
    }

    private constructor(participants: Array<Inscribed>) {
        super(participants);
    }

    public static create(participants: Array<Inscribed>) {
        return new InscribedList(participants);
    }
}
