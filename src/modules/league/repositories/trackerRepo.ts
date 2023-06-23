import { MatchTracker } from "../domain/matchTracker";

export interface TrackerRepository {
    save(tracker: MatchTracker): Promise<void>
    findTrackerByMatchId(matchId: string): Promise<MatchTracker>
}
