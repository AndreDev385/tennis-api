import { Sequelize } from "sequelize";
import { Player } from "../../../league/domain/player";
import { User } from "../../domain/user";
import { PlayerRegisterRepository } from "../playerRegisterRepo";
import config from "../../../../shared/infra/database/sequelize/config/config";
import { PlayerMap } from "../../../league/mappers/playerMap";
import { UserMap } from "../../mappers/userMap";
import { Result } from "../../../../shared/core/Result";
import models from "../../../../shared/infra/database/sequelize/models";

const sequelize: Sequelize = config.connection;

export class SequelizePlayerRegisterRepository
	implements PlayerRegisterRepository {
	async registerBulk(users: User[], players: Player[]): Promise<Result<void>> {
		const t = await sequelize.transaction();

		try {
			for (let i = 0; i < users.length; i++) {
				if (users[i]) {
					const rawUser = await UserMap.toPersistance(users[i]);
					await models.UserModel.create(rawUser, { transaction: t });
				}
			}
			for (let i = 0; i < players.length; i++) {
				if (players[i]) {
					const rawPlayer = PlayerMap.toPersistance(players[i]);
					await models.PlayerModel.create(rawPlayer, { transaction: t });
				}
			}
			await t.commit();
			return Result.ok<void>();
		} catch (error) {
			console.log(error);
			await t.rollback();
			return Result.fail((error as Error).message ?? error);
		}
	}

	async register(user: User, player: Player): Promise<Result<void>> {
		const t = await sequelize.transaction();

		const rawPlayer = PlayerMap.toPersistance(player);
		const rawUser = await UserMap.toPersistance(user);

		try {
			await models.UserModel.create(rawUser, { transaction: t });
			await models.PlayerModel.create(rawPlayer, { transaction: t });

			await t.commit();

			return Result.ok<void>();
		} catch (error) {
			await t.rollback();
			return Result.fail((error as Error).message ?? error);
		}
	}
}
