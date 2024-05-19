import models from "../../../../shared/infra/database/sequelize/models";
import { League } from "../../domain/league";
import { LeagueMap } from "../../mappers/leagueMap";
import { LeagueRepository } from "../leagueRepo";

export class SequelizeLeagueRepository implements LeagueRepository {
    async save(league: League): Promise<void> {
        const raw = LeagueMap.toPersistance(league);

        const exists = await models.LeagueModel.findOne({
            where: { leagueId: raw.leagueId },
        });

        if (exists) {
            await models.LeagueModel.update(raw, {
                where: { leagueId: raw.leagueId },
            });
        } else {
            const instance = await models.LeagueModel.create(raw);
            await instance.save();
        }
    }

    async list(): Promise<any[]> {
        const list = await models.LeagueModel.findAll({});

        return list;
    }
}
