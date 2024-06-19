import { WatchedList } from "../../../shared/domain/WatchedList";
import { ParticipantId } from "./participantId";

export class ParticipantsIds extends WatchedList<ParticipantId> {
    compareItems(a: ParticipantId, b: ParticipantId): boolean {
        return a.equals(b);
    }

    private constructor(participantsIds: Array<ParticipantId>) {
        super(participantsIds);
    }

    public static create(participantsIds: Array<ParticipantId>) {
        return new ParticipantsIds(participantsIds);
    }
}
