import { TournamentModel } from "../../../shared/infra/database/sequelize/models/Tournament";
import { PaginateQuery } from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { TournamentMap } from "../mapper/TournamentMap";

type TournamentFilters = {
    tournamentId?: string;
    status?: number;
};

export async function listTournaments(
    filters: TournamentFilters,
    pagination: PaginateQuery = { limit: 10, offset: 0 }
) {
    const result = await TournamentModel.findAndCountAll({
        where: filters,
        ...pagination,
    });

    const dtos = result.rows.map((d) => TournamentMap.forQuery(d));

    return { rows: dtos, count: result.count };
}
