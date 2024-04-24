import { Result } from "../../../../shared/core/Result";
import { ParticipantTracker } from "../../domain/participantTracker";
import {
    ParticipantTrackerQuery,
    ParticipantTrackerRepository,
} from "../participantTrackerRepo";

//TODO: impl
export class SequelizeParticipantTrackerRepository
    implements ParticipantTrackerRepository {
    async get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>> {
        throw new Error("Method not implemented.");
    }
    async save(p: ParticipantTracker): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
