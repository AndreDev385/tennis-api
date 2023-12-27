import { AdModel } from "../../../../shared/infra/database/sequelize/models/Ad";
import { Ad } from "../../domain/ad";
import { AdMap } from "../../mappers/adMap";
import { AdQuery, AdRepository } from "../adRepo";

export class SequelizeAdRepository implements AdRepository {

    async findById(adId: string): Promise<Ad> {
        const ad = await AdModel.findOne({ where: { adId } });

        if (!!ad == false) {
            throw new Error("Ad no encontrada");
        }

        return AdMap.toDomain(ad)!;
    }

    async delete(adId: string): Promise<void> {
        await this.findById(adId);

        await AdModel.destroy({ where: { adId } });
    }

    async list(query: AdQuery = {}): Promise<Ad[]> {
        const list = await AdModel.findAll({ where: query as any });

        return list.map((ad: any) => AdMap.toDomain(ad)!);
    }

    async save(ad: Ad): Promise<void> {
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
