import { PlayerTracker } from "../../domain/playerTracker";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
import { PlayerTrackerQuery, PlayerTrackerRepository } from "../playerTrackerRepo";

export class SequelizePlayerTrackerRepository
    implements PlayerTrackerRepository {
    models: any;

    constructor(models: any) {
        this.models = models;
    }
    async save(playerTracker: PlayerTracker): Promise<void> {
        const PlayerTrackerModel = this.models.PlayerTrackerModel;

        const raw = PlayerTrackerMapper.toPersistance(playerTracker);

        const exist = await PlayerTrackerModel.findOne({
            where: {
                playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            },
        });

        if (exist) {
            await PlayerTrackerModel.update(raw, {
                where: {
                    playerTrackerId:
                        playerTracker.playerTrackerId.id.toString(),
                },
            });
        } else {
            const instance = await PlayerTrackerModel.create(raw);
            await instance.save();
        }
    }

    async getById(playerTrackerId: string): Promise<PlayerTracker> {
        const PlayerTrackerModel = this.models.PlayerTrackerModel;

        const playerTracker = await PlayerTrackerModel.findOne({
            where: { playerTrackerId },
        });

        if (!!playerTracker == false) {
            throw new Error("Estadisticas de jugador no encontradas.");
        }

        return PlayerTrackerMapper.toDomain(playerTracker);
    }

    async getByPlayerId(query: PlayerTrackerQuery): Promise<PlayerTracker[]> {
        const PlayerTrackerModel = this.models.PlayerTrackerModel;

        let _query = {
            where: {
                playerId: query.playerId,
            },
            order: [['createdAt', "DESC"]],
            limit: query.limit,
        }

        if (query.seasonId != null) {
            _query.where["seasonId"] = query.seasonId
        }

        const list = await PlayerTrackerModel.findAll(_query);

        return list.map((t) => PlayerTrackerMapper.toDomain(t));
    }
}
