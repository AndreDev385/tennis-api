import { ClubEventModel } from "../../../../shared/infra/database/sequelize/models/ClubEvent";
import { ClubEvent } from "../../domain/clubEvent";
import { ClubEventMap } from "../../mappers/clubEventMap";
import { ClubEventQuery, ClubEventRepository } from "../clubEventRepo";

export class SequelizeClubEventRepository implements ClubEventRepository {
    async delete(clubEventId: string): Promise<void> {
        await this.findById(clubEventId);

        await ClubEventModel.destroy({ where: { clubEventId } })
    }

    async findById(clubEventId: string): Promise<ClubEvent> {
        const event = await ClubEventModel.findOne({ where: { clubEventId } })

        if (!!event == false) {
            throw new Error("Evento no encontrado");
        }

        return ClubEventMap.toDomain(event)!;
    }

    async list(query: ClubEventQuery): Promise<ClubEvent[]> {
        const list = await ClubEventModel.findAll({ where: query as any, order: [['createdAt', 'DESC']] },);

        return list.map((event: any) => ClubEventMap.toDomain(event)!);
    }

    async save(event: ClubEvent): Promise<void> {
        const exist = await ClubEventModel.findOne({
            where: { clubEventId: event.clubEventId.id.toString() },
        });

        const raw = ClubEventMap.toPersistance(event);

        if (!!exist === true) {
            await ClubEventModel.update(raw, {
                where: { clubEventId: event.clubEventId.id.toString() },
            });
        } else {
            const instance = await ClubEventModel.create(raw);
            await instance.save();
        }
    }
}
