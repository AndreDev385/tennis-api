import { Ranking } from "../../domain/ranking";
import { RankingMap, toDomainRanking } from "../../mappers/rankingMap";
import { RankingQuery, RankingRepository } from "../rankingRepo";
import { TeamRepository } from "../teamRepo";

export class SequelizeRankingRepository implements RankingRepository {
    private models: any;
    private teamRepo: TeamRepository;

    constructor(models: any, teamRepo: TeamRepository) {
        this.models = models;
        this.teamRepo = teamRepo;
    }

    private fromDb(dbRow: any): toDomainRanking {
        return {
            team: dbRow.team,
            rankingId: dbRow.rankingId,
            seasonId: dbRow.seasonId,
            position: dbRow.position,
        }
    }

    async save(ranking: Ranking): Promise<void> {
        const RankingModel = this.models.RankingModel;

        const raw = RankingMap.toPersistance(ranking);

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

        for (const ranking of list) {
            const team = await this.teamRepo.getById(ranking.teamId);

            ranking.team = team;
        }

        return list.map((i: any) => RankingMap.toDomain(this.fromDb(i)));
    }

    async getRanking(teamId: string, seasonId: string): Promise<Ranking> {
        const RankingModel = this.models.RankingModel;

        const exist = await RankingModel.findOne({ where: { teamId, seasonId } });

        if (!!exist == false) {
            throw Error("ranking no encontrado");
        }

        const team = await this.teamRepo.getById(exist.tamId);

        exist.team = team;

        return RankingMap.toDomain(this.fromDb(exist));
    }
}
