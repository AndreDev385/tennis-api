import { Result } from "../../../shared/core/Result";
import { TournamentMatchTracker } from "../domain/tournamentMatchTracker";

export type TournamentMatchTrackerQuery = {
    matchId?: string;
};

export type TournamentMatchTrackerRepo = {
    save(tracker: TournamentMatchTracker): Promise<void>;
    get(q: TournamentMatchTrackerQuery): Promise<Result<TournamentMatchTracker>>;
};
