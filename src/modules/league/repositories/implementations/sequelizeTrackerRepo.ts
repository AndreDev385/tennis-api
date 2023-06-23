import { MatchTracker } from "../../domain/matchTracker";
import { TrackerMap } from "../../mappers/trackerMap";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeTrackerRepository implements TrackerRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async save(tracker: MatchTracker): Promise<void> {
        const TrackerModel = this.models.TrackerModel;

        const raw = TrackerMap.toPersistance(tracker);

        const exists = TrackerModel.findOne({
            where: { matchId: raw.matchId },
        });

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
            throw new Error("Tracker not found");
        }

        return TrackerMap.toDomain(tracker);
    }
}
