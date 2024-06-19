import { Result } from "../../../shared/core/Result";
import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { ContestClash } from "../domain/contestClash";
import { ContestClashDto } from "../dtos/contestClashDto";

export type ContestClashQuery = {
    contestClashId?: string;
    contestId?: string;
    team1Id?: string;
    team2Id?: string;
    deep?: number;
    matchIds?: string[];
};

export type ContestClashRepository = {
    paginate(
        q: ContestClashQuery,
        pq: PaginateQuery
    ): Promise<PaginateResponse<ContestClashDto[]>>;
    get(q: ContestClashQuery): Promise<Result<ContestClash>>;
    save(clash: ContestClash): Promise<Result<void>>;
    delete(q: ContestClashQuery): Promise<Result<void>>;
};
