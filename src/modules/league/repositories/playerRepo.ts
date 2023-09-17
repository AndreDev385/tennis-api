import { Player } from "../domain/player";

export interface PlayerQuery {
    clubId?: string;
    includeDeleted?: boolean;
}

export interface PlayerRepository {
    list(query?: PlayerQuery): Promise<Array<Player>>
    exist(userId: string): Promise<boolean>
    save(player: Player): Promise<void>
    getPlayerById(playerId: string): Promise<Player>
    getPlayerByUserId(userId: string): Promise<Player>
}
