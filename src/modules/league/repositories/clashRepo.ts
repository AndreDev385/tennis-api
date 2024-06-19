import {
    PaginateQuery,
    PaginateResponse,
} from "../../../shared/infra/database/sequelize/queries/sequelizeQueries";
import { Clash } from "../domain/clubClash";

export interface ClashQuery {
    [index: string]: any;
    categoryId?: string;
    isFinish?: boolean;
    journey?: string;
    seasonId?: string;
    team1?: string;
    team2?: string;
    clubId?: string;
}

export interface ClashRepository {
    clashExist(
        team1: string,
        team2: string,
        journey: string,
        category: string
    ): Promise<boolean>;
    save(clash: Clash): Promise<void>;
    getClashById(id: string): Promise<Clash>;
    list(filters: ClashQuery): Promise<Array<Clash>>;
    paginate(
        filters: ClashQuery,
        pagination: PaginateQuery
    ): Promise<PaginateResponse<Clash>>;
    delete(clashId: string): Promise<void>;
}
