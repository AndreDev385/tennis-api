import { Clash } from "../domain/clubClash";

export interface ClashQuery {
    categoryId?: string;
    isFinish?: boolean;
    journey?: string;
    seasonId?: string;
    team1?: string;
    team2?: string;
}

export interface ClashRepository {
    clashExist(team1: string, team2: string, journey: string, category: string): Promise<boolean>
    save(clash: Clash): Promise<void>;
    getClashById(id: string): Promise<Clash>;
    list(filters: ClashQuery): Promise<Array<Clash>>;
}
