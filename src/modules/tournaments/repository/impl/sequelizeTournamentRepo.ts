import models from "../../../../shared/infra/database/sequelize/models";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Tournament } from "../../domain/tournament";
import { TournamentDto } from "../../dtos/tournamentDto";
import { TournamentMap } from "../../mapper/TournamentMap";
import { TournamentQuery, TournamentRepository } from "../tournamentRepo";

export class SequelizeTournamentRepository implements TournamentRepository {

    async delete(tournamentId: string): Promise<void> {
        await models.TournamentModel.destroy({ where: { tournamentId } })
    }

    private async exists(tournamentId: string) {
        const exist = await models.TournamentModel.findOne({
            where: { tournamentId },
        });

        return !!exist;
    }

    async paginate(
        filters: TournamentQuery,
        pagination: PaginateQuery = { limit: 10, offset: 0 }
    ): Promise<PaginateResponse<TournamentDto>> {
        const result = await models.TournamentModel.findAndCountAll({
            where: filters,
            ...pagination,
        });

        const dtos = result.rows.map((d) => TournamentMap.forQuery(d));

        return { rows: dtos, count: result.count };
    }

    async save(tournament: Tournament): Promise<void> {
        const raw = TournamentMap.toPersistance(tournament);

        const exist = await this.exists(tournament.tournamentId.id.toString());

        if (exist) {
            await models.TournamentModel.update(raw, {
                where: { tournamentId: raw.tournamentId },
            });
            return;
        } else {
            const instance = await models.TournamentModel.create(raw);
            await instance.save();
        }
    }

    async get(q: TournamentQuery): Promise<Tournament> {
        const data = await models.TournamentModel.findOne({ where: q });

        if (!data) {
            throw new Error("Torneo no encontrado");
        }

        return TournamentMap.toDomain(data);
    }
}
