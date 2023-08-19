import { Ranking } from "../../domain/ranking";
import { RankingMap } from "../../mappers/rankingMap";
import { RankingQuery, RankingRepository } from "../rankingRepo";

export class SequelizeRankingRepository implements RankingRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(ranking: Ranking): Promise<void> {
        const RankingModel = this.models.RankingModel;

        const raw = RankingMap.toDto(ranking);

        const exist = await RankingModel.findOne({
            where: { rankingId: raw.rankingId },
        });

        if (!!exist == true) {
            await RankingModel.update(raw, {
                where: { rankingId: raw.rankingId },
            });
        } else {
            const instance = await RankingModel.create(raw);
            await instance.save();
        }
    }

    async list(query: RankingQuery): Promise<Ranking[]> {
        const RankingModel = this.models.RankingModel;

        const list = await RankingModel.findAll({ where: query });

        return list.map((i: any) => RankingMap.toDomain(i));
    }

    async getRanking(teamId: string, seasonId: string): Promise<Ranking> {
        const RankingModel = this.models.RankingModel;

        const exist = await RankingModel.findOne({ where: { teamId, seasonId } });

        if (!!exist == false) {
            throw Error("ranking no encontrado");
        }

        return RankingMap.toDomain(exist);
    }
}
