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

        console.log("Me in TRepo", tracker.me);

        await this.playerTracker.save(tracker.me);

        if (!!tracker.partner === true) {
            await this.playerTracker.save(tracker.partner);
        }

        const raw = TrackerMap.toPersistance(tracker);

        const exists = await TrackerModel.findOne({
            where: { matchId: tracker.matchId.id.toString() },
        });

        if (!!exists == true) {
            await TrackerModel.update(raw, { where: { matchId: raw.matchId } });
        } else {
            const intance = await TrackerModel.create(raw);
            await intance.save();
        }
    }

    async findTrackerByMatchId(matchId: string): Promise<MatchTracker> {
        const TrackerModel = this.models.TrackerModel;

        const raw = await TrackerModel.findOne({
            where: { matchId },
        });

        if (!raw) {
            throw new Error("Estadisticas de partido no encontradas.");
        }

        const me = await this.playerTracker.getById(raw.me);
        let partner: any;

        if (!!raw.partner == true) {
            partner = await this.playerTracker.getById(raw.partner);
        }

        return TrackerMap.toDomain({
            matchId: raw.matchId,
            me,
            partner,
            rivalAces: raw.rivalAces,
            longRallyWon: raw.longRallyWon,
            rivalWinners: raw.rivalWinners,
            breakPtsWinned: raw.breakPtsWinned,
            longRallyLost: raw.longRallyLost,
            shortRallyWon: raw.shortRallyWon,
            gamesWonServing: raw.gamesWonServing,
            mediumRallyWon: raw.mediumRallyWon,
            shortRallyLost: raw.shortRallyLost,
            gamesLostServing: raw.gamesLostServing,
            mediumRallyLost: raw.mediumRallyLost,
            rivalDobleFault: raw.rivalDobleFault,
            gamesWonReturning: raw.gamesWonReturning,
            rivalFirstServIn: raw.rivalFirstServIn,
            gamesLostReturning: raw.gamesLostReturning,
            winBreakPtsChances: raw.winBreakPtsChances,
            rivalSecondServIn: raw.rivalSecondServIn,
            rivalFirstReturnIn: raw.rivalFirstReturnIn,
            rivalNoForcedErrors: raw.rivalNoForcedErrors,
            rivalSecondReturnIn: raw.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: raw.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: raw.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: raw.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn: raw.rivalPointsWinnedSecondReturn,
        });
    }
}
