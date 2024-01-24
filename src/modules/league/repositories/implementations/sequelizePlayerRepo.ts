import { UserModel } from "../../../../shared/infra/database/sequelize/models/BaseUser";
import { PlayerModel } from "../../../../shared/infra/database/sequelize/models/Player";
import { Player } from "../../domain/player";
import { PlayerMap } from "../../mappers/playerMap";
import { PlayerQuery, PlayerRepository } from "../playerRepo";

export class SequelizePlayerRepository implements PlayerRepository {
    private baseQuery(): any {
        return {
            where: {},
            include: [{ model: UserModel, as: "user" }],
        };
    }

    async exist(userId: string): Promise<boolean> {
        const exist = await PlayerModel.findOne({ where: { userId } });
        return !!exist === true;
    }

    async list(query?: PlayerQuery): Promise<Player[]> {
        const baseQuery = this.baseQuery();

        baseQuery.where = query;

        let rawList = await PlayerModel.findAll(baseQuery);

        if (!query?.includeDeleted) {
            rawList = rawList.filter((o: any) => o.user.isDeleted == false);
        }

        const list = rawList.map((p: any) => PlayerMap.toDomain(p)!);

        return list;
    }

    async save(player: Player): Promise<void> {
        const raw = PlayerMap.toPersistance(player);

        const exist = await this.exist(player.userId.id.toString());

        if (exist) {
            PlayerModel.update(raw, { where: { userId: raw.userId } });
        } else {
            const instance = await PlayerModel.create(raw);
            await instance.save();
        }
    }

    async getPlayerById(playerId: string): Promise<Player> {
        const query = this.baseQuery();
        query.where["playerId"] = playerId;

        const rawPlayer = await PlayerModel.findOne(query);

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

        const rawPlayer = await PlayerModel.findOne(query);

        return PlayerMap.toDomain(rawPlayer)!;
    }
}
