import { Match } from "../domain/match";

export interface MatchQuery {
    clashId?: string;
    isFinish?: boolean;
}

export interface MatchRepository {
    save(match: Match): Promise<void>;
    list(query: MatchQuery): Promise<Array<Match>>;
    getMatchById(matchId: string): Promise<Match>;
    getMatchsByClashId(clashId: string): Promise<Array<Match>>;
}
