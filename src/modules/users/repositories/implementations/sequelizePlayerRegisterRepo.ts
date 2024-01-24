import { Sequelize } from "sequelize";
import { Player } from "../../../league/domain/player";
import { User } from "../../domain/user";
import { PlayerRegisterRepository } from "../playerRegisterRepo";
import config from "../../../../shared/infra/database/sequelize/config/config";
import { PlayerMap } from "../../../league/mappers/playerMap";
import { UserMap } from "../../mappers/userMap";
import { UserModel } from "../../../../shared/infra/database/sequelize/models/BaseUser";
import { PlayerModel } from "../../../../shared/infra/database/sequelize/models/Player";
import { Result } from "../../../../shared/core/Result";

const sequelize: Sequelize = config.connection;

export class SequelizePlayerRegisterRepository
    implements PlayerRegisterRepository
{
    async registerBulk(
        users: User[],
        players: Player[]
    ): Promise<Result<void>> {
        const t = await sequelize.transaction();

        try {
            for (let i = 0; i < users.length; i++) {
                const rawUser = await UserMap.toPersistance(users[i]);
                const rawPlayer = PlayerMap.toPersistance(players[i]);

                await UserModel.create(rawUser, { transaction: t });
                await PlayerModel.create(rawPlayer, { transaction: t });
            }
            await t.commit();
            return Result.ok<void>();
        } catch (error) {
            await t.rollback();
            return Result.fail((error as Error).message ?? error);
        }
    }

    async register(user: User, player: Player): Promise<Result<void>> {
        const t = await sequelize.transaction();

        const rawPlayer = PlayerMap.toPersistance(player);
        const rawUser = await UserMap.toPersistance(user);

        try {
            await UserModel.create(rawUser, { transaction: t });
            await PlayerModel.create(rawPlayer, { transaction: t });

            await t.commit();

            return Result.ok<void>();
        } catch (error) {
            await t.rollback();
            return Result.fail((error as Error).message ?? error);
        }
    }
}
