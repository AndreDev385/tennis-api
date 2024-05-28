import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";
import { ParticipantTracker } from "../../domain/participantTracker";
import { ParticipantTrackerMap } from "../../mapper/ParticipantTrackerMap";
import {
    ParticipantTrackerQuery,
    ParticipantTrackerRepository,
} from "../participantTrackerRepo";

export class SequelizeParticipantTrackerRepository
    implements ParticipantTrackerRepository
{
    async get(q: ParticipantTrackerQuery): Promise<Result<ParticipantTracker>> {
        const data = await models.ParticipantTrackerModel.findOne({
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

        const exist = await models.ParticipantTrackerModel.findOne({
            where: {
                participantTrackerId: p.participantTrackerId.id.toString(),
            },
        });

        if (exist) {
            models.ParticipantTrackerModel.update(raw!, {
                where: {
                    participantTrackerId: p.participantTrackerId.id.toString(),
                },
            });
        } else {
            const instance = await models.ParticipantTrackerModel.create(raw!);
            await instance.save();
        }
    }
}
