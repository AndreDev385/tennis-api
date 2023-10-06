import { PausedMatch } from "../domain/pausedMatch";

export interface PausedMatchRepository {
    save(value: PausedMatch): Promise<void>
    getByMatchId(matchId: string): Promise<PausedMatch>
}
