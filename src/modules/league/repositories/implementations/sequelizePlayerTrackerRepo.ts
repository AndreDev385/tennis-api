import { PlayerTracker } from "../../domain/playerTracker";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
import { PlayerTrackerRepository } from "../playerTrackerRepo";

export class SequelizePlayerTrackerRepository
    implements PlayerTrackerRepository
{
    models: any;

    constructor(models: any) {
        this.models = models;
    }
    async save(playerTracker: PlayerTracker): Promise<void> {
        const PlayerTrackerModel = this.models.PlayerTrackerModel;

        const raw = PlayerTrackerMapper.toDto(playerTracker);

        const exist = await PlayerTrackerModel.findOne({
            where: {
                PlayerTrackerId: playerTracker.playerTrackerId.id.toString(),
            },
        });

        if (exist) {
            await PlayerTrackerModel.update(raw, {
                where: {
                    PlayerTrackerId:
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
            throw new Error("Estadisticas no encontradas.");
        }

        return PlayerTrackerMapper.toDomain(playerTracker);
    }

    async getByPlayerId(playerId: string): Promise<PlayerTracker[]> {
        const PlayerTrackerModel = this.models.PlayerTrackerModel;

        const list = await PlayerTrackerModel.findAll({ where: { playerId } });

        return list.map((t) => PlayerTrackerMapper.toDomain(t));
    }
}
