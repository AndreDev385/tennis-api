import { ClubEvent } from "../../domain/clubEvent";
import { ClubEventMap } from "../../mappers/clubEventMap";
import { ClubEventRepository } from "../clubEventRepo";

export class SequelizeClubEventRepository implements ClubEventRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async list(): Promise<ClubEvent[]> {
        const ClubEventModel = this.models.ClubEventModel;

        const list = await ClubEventModel.findAll({});

        return list.map((event: any) => ClubEventMap.toDomain(event));
    }

    async create(event: ClubEvent): Promise<void> {
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
