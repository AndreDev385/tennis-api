import { PlayerTracker } from "../domain/playerTracker";

export interface PlayerTrackerRepository {
    save(playerTracker: PlayerTracker): Promise<void>
    getById(playerTrackerId: string): Promise<PlayerTracker>
    getByPlayerId(playerId: string): Promise<Array<PlayerTracker>>
}
