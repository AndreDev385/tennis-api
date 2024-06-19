import { Result } from "../../../shared/core/Result";
import { PaginateQuery } from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ParticipantTracker } from "../domain/participantTracker";
import { ParticipantTrackerDto } from "../dtos/participantTrackerDto";

export type ParticipantTrackerQuery = {
    participantId?: string;
    participantTrackerId?: string;
    tournamentId?: string;
}

export type ParticipantTrackerRepository = {
    all(q: ParticipantTrackerQuery, pagination: PaginateQuery): Promise<ParticipantTrackerDto>
    get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>>
    save(p: ParticipantTracker): Promise<void>;
}
