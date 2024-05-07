import { Result } from "../../../shared/core/Result";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { TournamentMatch } from "../domain/tournamentMatch";

export type TournamentMatchQuery = {
    matchId?: string;
    tournamentId?: string;
    contestId?: string;
};

export type TournamentMatchRepo = {
    paginate(
        q: TournamentMatchQuery,
        p: PaginateQuery
    ): Promise<PaginateResponse<TournamentMatch>>;
    get(q: TournamentMatchQuery): Promise<Result<TournamentMatch>>;
    save(match: TournamentMatch): Promise<void>;
};
