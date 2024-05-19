import { Result } from "../../../../shared/core/Result";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import models from "../../../../shared/infra/database/sequelize/models";
import { TournamentAd } from "../../domain/tournamentAd";
import { TournamentId } from "../../domain/tournamentId";
import { TournamentAdQuery, TournamentAdRepository } from "../tournamentAdRepo";

export class SequelizeTournamentAdRepository implements TournamentAdRepository {
    async save(ad: TournamentAd): Promise<Result<void>> {
        try {
            const instance = await models.TournamentAdModel.create({
                image: ad.image,
                link: ad.link,
                tournamentId: ad.tournamentId.id.toString(),
            });

            await instance.save();

            return Result.ok();
        } catch (error) {
            return Result.fail("Ha ocurrido un error al guardar el ad");
        }
    }

    async delete(image: string): Promise<Result<void>> {
        try {
            const deletedRows = await models.TournamentAdModel.destroy({
                where: { image },
            });

            if (deletedRows == 0) {
                return Result.fail("Ad no encontrada");
            }

            return Result.ok();
        } catch (error) {
            return Result.fail("Ha ocurrido un error al eliminar el ad");
        }
    }

    async list(q: TournamentAdQuery): Promise<TournamentAd[]> {
        const rows = await models.TournamentAdModel.findAll({ where: q });

        return rows.map((r) =>
            TournamentAd.create({
                link: r.link,
                tournamentId: TournamentId.create(
                    new UniqueEntityID(r.tournamentId)
                ).getValue(),
                image: r.image,
            }).getValue()
        );
    }
}
