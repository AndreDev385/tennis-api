import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { PaginateResponse } from "../../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { TournamentDto } from "../../dtos/tournamentDto";
import { sequelizeTournamentRepo } from "../../repository";
import { TournamentQuery } from "../../repository/tournamentRepo";

type Response = Either<
    AppError.UnexpectedError,
    Result<PaginateResponse<TournamentDto>>
>;

const validFilters: Array<keyof TournamentQuery> = [
    "tournamentId",
    "name",
    "status",
];

export async function paginateTournaments(q: any): Promise<Response> {
    try {
        const query: TournamentQuery = {};

        for (const [k, v] of Object.entries(q)) {
            if (validFilters.includes(k as keyof TournamentQuery)) {
                query[k as keyof TournamentQuery] = v as any;
            }
        }

        const result = await sequelizeTournamentRepo.paginate(query, {
            offset: q.offset,
            limit: q.limit,
        });

        console.log(result);

        return right(Result.ok(result));
    } catch (error) {
        return left(new AppError.UnexpectedError(error));
    }
}
