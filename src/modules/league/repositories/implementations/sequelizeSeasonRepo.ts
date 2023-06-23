import { Season } from "../../domain/season";
import { SeasonMap } from "../../mappers/seasonMap";
import { SeasonRepository } from "../seasonRepo";

export class SequelizeSeasonRepository implements SeasonRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(season: Season): Promise<void> {
        const SeasonModel = this.models.SeasonModel;

        const rawSeason = SeasonMap.toDto(season);

        const exists = await SeasonModel.findOne({
            where: { seasonId: rawSeason.seasonId },
        });

        if (exists) {
            await SeasonModel.update(rawSeason, {
                where: { seasonId: rawSeason.seasonId },
            });
        } else {
            const instance = await SeasonModel.create(rawSeason);
            await instance.save();
        }
    }

    async listSeasonsByLeague(leagueId: string): Promise<any[]> {
        const SeasonModel = this.models.SeasonModel;

        const list = await SeasonModel.findAll({ where: { leagueId } });

        return list;
    }

    async findById(seasonId: string): Promise<Season> {
        const SeasonModel = this.models.SeasonModel;

        const season = await SeasonModel.findOne({ where: { seasonId } });
        if (!season) {
            throw new Error("Not found");
        }

        return SeasonMap.toDomain(season);
    }
}
