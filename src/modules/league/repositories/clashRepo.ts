import { Clash } from "../domain/clubClash";

export interface ClashQuery {
    categoryId?: string;
    isFinish?: boolean;
    journey?: string;
    seasonId?: string;
    team1?: string;
    team2?: string;
}

export interface PaginateQuery {
    limit?: number;
    offset?: number;
}

export interface ClashRepository {
    clashExist(team1: string, team2: string, journey: string, category: string): Promise<boolean>
    save(clash: Clash): Promise<void>;
    getClashById(id: string): Promise<Clash>;
    list(filters: ClashQuery): Promise<Array<Clash>>;
    paginate(filters: ClashQuery, pagination: PaginateQuery): Promise<any>;
    delete(clashId: string): Promise<void>;
}
