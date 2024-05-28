import models from "../../../../shared/infra/database/sequelize/models";
import { PlayerTracker } from "../../domain/playerTracker";
import { PlayerTrackerMapper } from "../../mappers/playerTrackerMap";
import {
    PlayerTrackerQuery,
    PlayerTrackerRepository,
} from "../playerTrackerRepo";

export class SequelizePlayerTrackerRepository
    implements PlayerTrackerRepository
{
    async save(playerTracker: PlayerTracker): Promise<void> {
        const raw = PlayerTrackerMapper.toPersistance(playerTracker);

        const exist = await models.PlayerTrackerModel.findOne({
            where: {
                playerTrackerId: playerTracker.playerTrackerId.id.toString(),
            },
        });

        if (exist) {
            await models.PlayerTrackerModel.update(raw, {
                where: {
                    playerTrackerId:
                        playerTracker.playerTrackerId.id.toString(),
                },
            });
        } else {
            const instance = await models.PlayerTrackerModel.create(raw);
            await instance.save();
        }
    }

    async getById(playerTrackerId: string): Promise<PlayerTracker> {
        const playerTracker = await models.PlayerTrackerModel.findOne({
            where: { playerTrackerId },
        });

        if (!!playerTracker == false) {
            throw new Error("Estadisticas de jugador no encontradas.");
        }

        return PlayerTrackerMapper.toDomain(playerTracker)!;
    }

    async getByPlayerId(query: PlayerTrackerQuery): Promise<PlayerTracker[]> {
        let _query: any = {
            where: {
                playerId: query.playerId,
                isDouble: query.isDouble,
            },
            order: [["createdAt", "DESC"]],
        };

        if (query.limit) {
            _query.limit = query.limit;
        }

        if (query.seasonId != null) {
            _query.where["seasonId"] = query.seasonId;
        }

        const list = await models.PlayerTrackerModel.findAll(_query);

        return list.map((t: any) => PlayerTrackerMapper.toDomain(t)!);
    }
}
