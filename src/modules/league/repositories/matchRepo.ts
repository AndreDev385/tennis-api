import { Match } from "../domain/match";

export interface MatchRepository {
    save(match: Match): Promise<void>;
    getMatchsByClashId(clashId: string): Promise<Array<Match>>;
    getMatchById(id: string): Promise<Match>;
}
