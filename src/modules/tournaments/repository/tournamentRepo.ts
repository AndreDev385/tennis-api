import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Tournament } from "../domain/tournament";
import { TournamentDto } from "../dtos/tournamentDto";

export type TournamentQuery = {
    tournamentId?: string;
    name?: string;
    status?: number;
};

export type TournamentRepository = {
    paginate(
        filters: TournamentQuery,
        pagination: PaginateQuery
    ): Promise<PaginateResponse<TournamentDto>>;
    save(tournament: Tournament): Promise<void>;
    get(q: TournamentQuery): Promise<Tournament>;
    delete(tournamentId: string): Promise<void>
};
