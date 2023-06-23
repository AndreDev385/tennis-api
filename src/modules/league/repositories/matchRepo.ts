import { Match } from "../domain/match";

export interface MatchRepository {
    save(match: Match): Promise<void>;
    getMatchById(id: string): Promise<void>;
}
