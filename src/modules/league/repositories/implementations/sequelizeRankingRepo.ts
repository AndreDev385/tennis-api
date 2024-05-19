import models from "../../../../shared/infra/database/sequelize/models";
import { RankingData } from "../../../../shared/infra/database/sequelize/models/leagues/Ranking";
import { Ranking } from "../../domain/ranking";
import { Team } from "../../domain/team";
import { RankingMap, toDomainRanking } from "../../mappers/rankingMap";
import { RankingQuery, RankingRepository } from "../rankingRepo";
import { TeamRepository } from "../teamRepo";

interface RankingDataForMap extends RankingData {
    team?: Team;
}

export class SequelizeRankingRepository implements RankingRepository {
    private teamRepo: TeamRepository;

    constructor(teamRepo: TeamRepository) {
        this.teamRepo = teamRepo;
    }

    private fromDb(dbRow: RankingDataForMap): toDomainRanking {
        return {
            team: dbRow.team!,
            rankingId: dbRow.rankingId,
            seasonId: dbRow.seasonId,
            position: dbRow.position,
            symbol: dbRow.symbol,
        };
    }

    async save(ranking: Ranking): Promise<void> {
        const raw = RankingMap.toPersistance(ranking);

        const exist = await models.RankingModel.findOne({
            where: { rankingId: raw.rankingId },
        });

        if (!!exist == true) {
            await models.RankingModel.update(raw, {
                where: { rankingId: raw.rankingId },
            });
        } else {
            const instance = await models.RankingModel.create(raw);
            await instance.save();
        }
    }

    async list(query: RankingQuery): Promise<Ranking[]> {
        const list: RankingDataForMap[] = await models.RankingModel.findAll({
            where: query as any,
        });

        for (const ranking of list) {
            const team = await this.teamRepo.getById(ranking.teamId);

            ranking.team = team;
        }

        return list.map((i: any) => RankingMap.toDomain(this.fromDb(i))!);
    }

    async getRanking(teamId: string, seasonId: string): Promise<Ranking> {
        const exist: RankingDataForMap | null =
            await models.RankingModel.findOne({ where: { teamId, seasonId } });

        if (!!exist == false) {
            throw Error("ranking no encontrado");
        }

        const team = await this.teamRepo.getById(exist!.teamId);

        exist!.team = team;

        return RankingMap.toDomain(this.fromDb(exist!))!;
    }
}
