import models from "../../../../shared/infra/database/sequelize/models";
import { Ad } from "../../domain/ad";
import { AdMap } from "../../mappers/adMap";
import { AdQuery, AdRepository } from "../adRepo";

export class SequelizeAdRepository implements AdRepository {
    async findById(adId: string): Promise<Ad> {
        const ad = await models.AdModel.findOne({ where: { adId } });

        if (!!ad == false) {
            throw new Error("Ad no encontrada");
        }

        return AdMap.toDomain(ad)!;
    }

    async delete(adId: string): Promise<void> {
        await this.findById(adId);

        await models.AdModel.destroy({ where: { adId } });
    }

    async list(query: AdQuery = {}): Promise<Ad[]> {
        const list = await models.AdModel.findAll({ where: query as any });

        return list.map((ad: any) => AdMap.toDomain(ad)!);
    }

    async save(ad: Ad): Promise<void> {
        const raw = AdMap.toPersistance(ad);

        const exist = await models.AdModel.findOne({
            where: { adId: ad.adId.id.toString() },
        });

        if (!!exist == true) {
            await models.AdModel.update(raw, { where: { adId: raw.adId } });
        } else {
            const instance = await models.AdModel.create(raw);
            await instance.save();
        }
    }
}
