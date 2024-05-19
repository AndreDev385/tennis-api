import { Result } from "../../../shared/core/Result";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ContestClash } from "../domain/contestClash";

export type ContestClashQuery = {
    contestClashId?: string;
    team1Id?: string;
    team2Id?: string;
    deep?: number;
};

export type ContestClashRepository = {
    paginate(
        q: ContestClashQuery,
        pq: PaginateQuery
    ): Promise<PaginateResponse<ContestClash[]>>;
    get(q: ContestClashQuery): Promise<Result<ContestClash>>;
    save(clash: ContestClash): Promise<Result<void>>;
};
