import { Ad } from "../../domain/ad";
import { AdMap } from "../../mappers/adMap";
import { AdQuery, AdRepository } from "../adRepo";

export class SequelizeAdRepository implements AdRepository {

    private models: any

    constructor(models: any) {
        this.models = models;
    }

    async findById(adId: string): Promise<Ad> {
        const AdModel = this.models.AdModel;

        const ad = await AdModel.findOne({ where: { adId } });

        if (!!ad == false) {
            throw new Error("Ad no encontrada");
        }

        return AdMap.toDomain(ad);
    }

    async delete(adId: string): Promise<void> {
        const AdModel = this.models.AdModel;

        await this.findById(adId);

        await AdModel.destroy({ where: { adId } });
    }

    async list(query: AdQuery = {}): Promise<Ad[]> {
        const AdModel = this.models.AdModel

        const list = await AdModel.findAll({ where: query });

        return list.map((ad: any) => AdMap.toDomain(ad));
    }

    async save(ad: Ad): Promise<void> {
        const AdModel = this.models.AdModel

        const raw = AdMap.toPersistance(ad);

        const exist = await AdModel.findOne({
            where: { adId: ad.adId.id.toString() }
        });

        if (!!exist == true) {
            await AdModel.update(raw, { where: { adId: raw.adId } })
        } else {
            const instance = await AdModel.create(raw);
            await instance.save();
        }
    }

}
