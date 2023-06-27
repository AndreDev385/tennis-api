import { Clash } from "../../domain/clubClash";
import { Matchs } from "../../domain/matchs";
import { ClashMap } from "../../mappers/clashMap";
import { MatchMap } from "../../mappers/matchMap";
import { ClashRepository } from "../clashRepo";
import { MatchRepository } from "../matchRepo";

export class SequelizeClashRepo implements ClashRepository {
    private models: any;
    private matchRepo: MatchRepository;

    constructor(models: any, matchRepo: MatchRepository) {
        this.models = models;
        this.matchRepo = matchRepo;
    }

    async save(clash: Clash): Promise<void> {
        const ClashModel = this.models.ClashModel;

        const raw = ClashMap.toPersistance(clash);

        const exist = await ClashModel.findOne({
            where: { clashId: raw.clashId },
        });

        console.log("RAW", raw);

        if (exist) {
            await ClashModel.update(raw, { where: { clashId: raw.clashId } });
        } else {
            const instance = await ClashModel.create(raw);
            await instance.save();
        }
    }

    async getClashById(id: string): Promise<Clash> {
        const ClashModel = this.models.ClashModel;

        const clashRaw = await ClashModel.findOne({ where: { clashId: id } });

        if (!clashRaw) {
            throw new Error("Clash no found");
        }

        const rawMatchs = await this.matchRepo.getMatchsByClashId(
            clashRaw.clashId
        );

        const matchsArr = rawMatchs.map((m) => MatchMap.toDomain(m));

        const matchs = Matchs.create(matchsArr);

        return ClashMap.toDomain(clashRaw, matchs);
    }

    async list(filters: any): Promise<any[]> {
        const ClashModel = this.models.ClashModel;

        const list = await ClashModel.findAll({ where: filters });

        return list;
    }
}
