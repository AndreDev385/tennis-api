import { PlayerTracker } from "../domain/playerTracker";

export interface PlayerTrackerQuery {
    playerId: string;
    isDouble: boolean;
    seasonId?: string;
    limit?: number;
}

export interface PlayerTrackerRepository {
    save(playerTracker: PlayerTracker): Promise<void>;
    getById(playerTrackerId: string): Promise<PlayerTracker>;
    getByPlayerId(query: PlayerTrackerQuery): Promise<Array<PlayerTracker>>;
}
