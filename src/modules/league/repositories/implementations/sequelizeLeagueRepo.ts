import { LeagueModel } from "../../../../shared/infra/database/sequelize/models/League";
import { League } from "../../domain/league";
import { LeagueMap } from "../../mappers/leagueMap";
import { LeagueRepository } from "../leagueRepo";

export class SequelizeLeagueRepository implements LeagueRepository {
    async save(league: League): Promise<void> {
        const raw = LeagueMap.toPersistance(league);

        const exists = await LeagueModel.findOne({
            where: { leagueId: raw.leagueId },
        });

        if (exists) {
            await LeagueModel.update(raw, {
                where: { leagueId: raw.leagueId },
            });
        } else {
            const instance = await LeagueModel.create(raw);
            await instance.save();
        }
    }

    async list(): Promise<any[]> {
        const list = await LeagueModel.findAll({});

        return list;
    }
}
