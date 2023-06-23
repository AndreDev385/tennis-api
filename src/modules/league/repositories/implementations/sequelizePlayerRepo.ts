import { Player } from "../../domain/player";
import { PlayerMap } from "../../mappers/playerMap";
import { PlayerRepository } from "../playerRepo";

export class SequelizePlayerRepository implements PlayerRepository {
    models: any;
    constructor(models: any) {
        this.models = models;
    }

    private baseQuery(): any {
        const models = this.models;
        return {
            where: {},
            include: [{ model: models.UserModel, as: "user" }],
        };
    }

    async exist(userId: string): Promise<boolean> {
        const PlayerModel = this.models.PlayerModel;

        const exist = await PlayerModel.findOne({ where: { userId } });
        return !!exist === true;
    }

    async save(player: Player): Promise<void> {
        const PlayerModel = this.models.PlayerModel;

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
        const PlayerModel = this.models.PlayerModel;
        const query = this.baseQuery();
        query.where["playerId"] = playerId;

        const rawPlayer = await PlayerModel.findOne(query);

        if (!rawPlayer) {
            throw new Error("Player not found");
        }

        return PlayerMap.toDomain(rawPlayer);
    }

    async getPlayerByUserId(userId: string): Promise<Player> {
        const PlayerModel = this.models.PlayerModel;

        const exist = await this.exist(userId);

        if (!exist) {
            throw new Error("Player not found");
        }

        const query = this.baseQuery();
        query.where["userId"] = userId;

        const rawPlayer = await PlayerModel.findOne(query);

        return PlayerMap.toDomain(rawPlayer);
    }
}
