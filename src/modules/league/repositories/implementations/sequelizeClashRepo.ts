import { Clash } from "../../domain/clubClash";
import { ClashMap } from "../../mappers/clashMap";
import { ClashRepository } from "../clashRepo";

export class SequelizeClashRepo implements ClashRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(clash: Clash): Promise<void> {
        const ClashModel = this.models.ClashModel;

        const raw = ClashMap.toPersistance(clash);

        const exist = await ClashModel.findOne({
            where: { clashId: raw.clashId },
        });

        console.log("RAW", raw)

        if (exist) {
            await ClashModel.update(raw, { where: { clashId: raw.clashId } });
        } else {
            const instance = await ClashModel.create(raw);
            await instance.save();
        }
    }

    async getClashById(id: string): Promise<Clash> {
        const ClashModel = this.models.ClashModel;

        const clash = await ClashModel.findOne({ where: { clashId: id } });

        if (!clash) {
            throw new Error("Clash no found");
        }

        return ClashMap.toDomain(clash);
    }

    async list(filters: any): Promise<any[]> {
        const ClashModel = this.models.ClashModel;

        const list = await ClashModel.findAll({ where: filters });

        return list;
    }
}
