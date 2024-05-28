import { WatchedList } from "../../../shared/domain/WatchedList";
import { Participant } from "./participant";

export class Participants extends WatchedList<Participant> {
    compareItems(a: Participant, b: Participant): boolean {
        return a.equals(b);
    }

    private constructor(participants: Array<Participant>) {
        super(participants);
    }

    public static create(participants: Array<Participant>) {
        return new Participants(participants);
    }
}
