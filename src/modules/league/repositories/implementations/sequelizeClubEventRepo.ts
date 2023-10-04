import { ClubEvent } from "../../domain/clubEvent";
import { ClubEventMap } from "../../mappers/clubEventMap";
import { ClubEventQuery, ClubEventRepository } from "../clubEventRepo";

export class SequelizeClubEventRepository implements ClubEventRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async delete(clubEventId: string): Promise<void> {
        const ClubEventModel = this.models.ClubEventModel;

        await this.findById(clubEventId);

        await ClubEventModel.destroy({ where: { clubEventId } })
    }

    async findById(clubEventId: string): Promise<ClubEvent> {
        const ClubEventModel = this.models.ClubEventModel;

        const event = await ClubEventModel.findOne({ where: { clubEventId } })

        if (!!event == false) {
            throw new Error("Evento no encontrado");
        }

        return ClubEventMap.toDomain(event);
    }

    async list(query: ClubEventQuery): Promise<ClubEvent[]> {
        const ClubEventModel = this.models.ClubEventModel;

        const list = await ClubEventModel.findAll({ where: query, order: [['createdAt', 'DESC']] },);

        return list.map((event: any) => ClubEventMap.toDomain(event));
    }

    async save(event: ClubEvent): Promise<void> {
        const ClubEventModel = this.models.ClubEventModel;

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
