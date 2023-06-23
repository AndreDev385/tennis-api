import { Player } from "../domain/player";

export interface PlayerRepository {
    exist(userId: string): Promise<boolean>
    save(player: Player): Promise<void>
    getPlayerById(playerId: string): Promise<Player>
    getPlayerByUserId(userId: string): Promise<Player>
}
