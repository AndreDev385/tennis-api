import { Result } from "../../../shared/core/Result";
import { Player } from "../../league/domain/player";
import { User } from "../domain/user";

export interface PlayerRegisterRepository {
    register(user: User, player: Player): Promise<Result<void>>;
    registerBulk(
        users: Array<User>,
        players: Array<Player>
    ): Promise<Result<void>>;
}
