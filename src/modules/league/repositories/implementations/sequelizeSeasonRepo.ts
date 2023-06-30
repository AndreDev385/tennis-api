import { Season } from "../../domain/season";
import { SeasonDto } from "../../dtos/seasonDto";
import { SeasonMap } from "../../mappers/seasonMap";
import { SeasonQuery, SeasonRepository } from "../seasonRepo";

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

    async list(query: SeasonQuery): Promise<SeasonDto[]> {
        const SeasonModel = this.models.SeasonModel;

        const list = await SeasonModel.findAll({ where: query });

        return list;
    }

    async findById(seasonId: string): Promise<Season> {
        const SeasonModel = this.models.SeasonModel;

        const season = await SeasonModel.findOne({ where: { seasonId } });
        if (!season) {
            throw new Error("Temporada no encontrada");
        }

        return SeasonMap.toDomain(season);
    }
}
