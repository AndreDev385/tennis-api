import models from "../../../../shared/infra/database/sequelize/models";
import { Season } from "../../domain/season";
import { SeasonDto } from "../../dtos/seasonDto";
import { SeasonMap } from "../../mappers/seasonMap";
import { SeasonQuery, SeasonRepository } from "../seasonRepo";

export class SequelizeSeasonRepository implements SeasonRepository {
    async currentSeason(): Promise<Season> {
        const currentSeason = await models.SeasonModel.findOne({
            where: { isCurrentSeason: true },
        });

        if (!!currentSeason == false) {
            throw new Error("No hay una temporada en curso");
        }

        return SeasonMap.toDomain(currentSeason)!;
    }

    async save(season: Season): Promise<void> {
        const rawSeason = SeasonMap.toDto(season);

        const exists = await models.SeasonModel.findOne({
            where: { seasonId: rawSeason.seasonId },
        });

        if (exists) {
            await models.SeasonModel.update(rawSeason, {
                where: { seasonId: rawSeason.seasonId },
            });
        } else {
            const instance = await models.SeasonModel.create(rawSeason);
            await instance.save();
        }
    }

    async list(query: SeasonQuery): Promise<SeasonDto[]> {
        const list = await models.SeasonModel.findAll({ where: query as any });

        return list;
    }

    async findById(seasonId: string): Promise<Season> {
        const season = await models.SeasonModel.findOne({
            where: { seasonId },
        });
        if (!season) {
            throw new Error("Temporada no encontrada");
        }

        return SeasonMap.toDomain(season)!;
    }
}
