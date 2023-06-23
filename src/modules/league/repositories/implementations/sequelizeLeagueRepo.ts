import { League } from "../../domain/league";
import { LeagueMap } from "../../mappers/leagueMap";
import { LeagueRepository } from "../leagueRepo";

export class SequelizeLeagueRepository implements LeagueRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(league: League): Promise<void> {
        const LeagueModel = this.models.LeagueModel;

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
        const LeagueModel = this.models.LeagueModel;

        const list = await LeagueModel.findAll({});

        return list;
    }
}
