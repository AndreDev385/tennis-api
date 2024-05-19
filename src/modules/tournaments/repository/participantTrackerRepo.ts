import { Result } from "../../../shared/core/Result";
import { ParticipantTracker } from "../domain/participantTracker";

export type ParticipantTrackerQuery = {
    participantId?: string;
    participantTrackerId?: string;
}

export type ParticipantTrackerRepository = {
    get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>>
    save(p: ParticipantTracker): Promise<void>;
}
