import models from "../../../../shared/infra/database/sequelize/models";
import { Player } from "../../domain/player";
import { PlayerMap } from "../../mappers/playerMap";
import { PlayerQuery, PlayerRepository } from "../playerRepo";

export class SequelizePlayerRepository implements PlayerRepository {
    private baseQuery(): any {
        return {
            where: {},
            include: [{ model: models.UserModel, as: "user" }],
        };
    }

    async exist(userId: string): Promise<boolean> {
        const exist = await models.PlayerModel.findOne({ where: { userId } });
        return !!exist === true;
    }

    async list(query?: PlayerQuery): Promise<Player[]> {
        const baseQuery = this.baseQuery();

        baseQuery.where = query;

        let rawList = await models.PlayerModel.findAll(baseQuery);

        if (!query?.includeDeleted) {
            rawList = rawList.filter(
                (o: any) => o.user.isDeleted == false && o.isDeleted == false
            );
        }

        const list = rawList.map((p: any) => PlayerMap.toDomain(p)!);

        return list;
    }

    async save(player: Player): Promise<void> {
        const raw = PlayerMap.toPersistance(player);

        const exist = await this.exist(player.userId.id.toString());

        if (exist) {
            models.PlayerModel.update(raw, { where: { userId: raw.userId } });
        } else {
            const instance = await models.PlayerModel.create(raw);
            await instance.save();
        }
    }

    async getPlayerById(playerId: string): Promise<Player> {
        const query = this.baseQuery();
        query.where["playerId"] = playerId;

        const rawPlayer = await models.PlayerModel.findOne(query);

        if (!rawPlayer) {
            throw new Error("Jugador no encontrado");
        }

        return PlayerMap.toDomain(rawPlayer)!;
    }

    async getPlayerByUserId(userId: string): Promise<Player> {
        const exist = await this.exist(userId);

        if (!exist) {
            throw new Error("Jugador no encontrado");
        }

        const query = this.baseQuery();
        query.where["userId"] = userId;

        const rawPlayer = await models.PlayerModel.findOne(query);

        return PlayerMap.toDomain(rawPlayer)!;
    }
}
