import { Ranking } from "../domain/ranking";

export interface RankingQuery {
    seasonId?: string;
    teamId?: string;
    position?: string;
}

export interface RankingRepository {
    save(ranking: Ranking): Promise<void>
    list(query: RankingQuery): Promise<Array<Ranking>>
    getRanking(teamId: string, seasonId: string): Promise<Ranking>
}
