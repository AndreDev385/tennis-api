import { Result } from "../../../../shared/core/Result";
import { ParticipantTrackerModel } from "../../../../shared/infra/database/sequelize/models/ParticipantTracker";
import { ParticipantTracker } from "../../domain/participantTracker";
import { ParticipantTrackerMap } from "../../mapper/ParticipantTrackerMap";
import {
    ParticipantTrackerQuery,
    ParticipantTrackerRepository,
} from "../participantTrackerRepo";

export class SequelizeParticipantTrackerRepository
    implements ParticipantTrackerRepository {

    async get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>> {
        const data = await ParticipantTrackerModel.findOne({
            where: q,
        });

        if (!data) {
            return Result.fail("Estadísticas no encontradas");
        }

        const tracker = ParticipantTrackerMap.toDomain(data);

        return Result.ok(tracker!);
    }

    async save(p: ParticipantTracker): Promise<void> {
        const raw = ParticipantTrackerMap.toDto(p);

        const exist = await ParticipantTrackerModel.findOne({
            where: { participantTrackerId: p.participantTrackerId.id.toString() },
        });

        if (exist) {
            ParticipantTrackerModel.update(raw!, {
                where: { participantTrackerId: p.participantTrackerId.id.toString() },
            });
        } else {
            const instance = await ParticipantTrackerModel.create(raw!);
            await instance.save();
        }
    }
}
