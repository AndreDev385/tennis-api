import { TeamStats } from "../domain/teamStats";

export interface TeamStatsQuery {
    teamId?: string;
    seasonId?: string;
    journey?: string;
}

export interface TeamStatsRepository {
    save(teamStats: TeamStats): Promise<void>;
    list(query: TeamStatsQuery): Promise<Array<TeamStats>>;
    getStats(seasonId: string, teamId: string, journey: string): Promise<TeamStats>
}
