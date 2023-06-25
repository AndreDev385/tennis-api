import { PlayerTracker } from "../domain/playerTracker";

export interface PlayerTrackerRepository {
    save(playerTracker: PlayerTracker): Promise<void>
    getByPlayerId(playerId: string): Promise<Array<PlayerTracker>>
}
