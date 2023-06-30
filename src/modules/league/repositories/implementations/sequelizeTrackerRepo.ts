import { MatchTracker } from "../../domain/matchTracker";
import { TrackerMap } from "../../mappers/trackerMap";
import { PlayerTrackerRepository } from "../playerTrackerRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeTrackerRepository implements TrackerRepository {
    private models: any;
    private playerTracker: PlayerTrackerRepository;

    constructor(models: any, playerTracker: PlayerTrackerRepository) {
        this.models = models;
        this.playerTracker = playerTracker;
    }

    async save(tracker: MatchTracker): Promise<void> {
        const TrackerModel = this.models.TrackerModel;

        const raw = TrackerMap.toPersistance(tracker);

        const exists = TrackerModel.findOne({
            where: { matchId: raw.matchId },
        });

        await this.playerTracker.save(tracker.me);

        if (!!tracker.partner === true) {
            await this.playerTracker.save(tracker.partner);
        }

        if (exists) {
            await TrackerModel.update(raw, { where: { matchId: raw.matchId } });
        } else {
            const intance = await TrackerModel.create(raw);
            await intance.save();
        }
    }

    async findTrackerByMatchId(matchId: string): Promise<MatchTracker> {
        const TrackerModel = this.models.TrackerModel;

        const tracker = TrackerModel.findOne({
            where: { matchId },
        });

        if (!tracker) {
            throw new Error("Estadisticas no encontradas.");
        }

        const me = await this.playerTracker.getById(tracker.me);
        let partner: any

        if (!!tracker.partner == true) {
            partner = await this.playerTracker.getById(tracker.partner);
        }

        return TrackerMap.toDomain({ ...tracker, me, partner });
    }
}
