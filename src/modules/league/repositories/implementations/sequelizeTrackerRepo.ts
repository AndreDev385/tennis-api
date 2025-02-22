import models from "../../../../shared/infra/database/sequelize/models";
import { MatchTracker } from "../../domain/matchTracker";
import { TrackerMap } from "../../mappers/trackerMap";
import { PlayerTrackerRepository } from "../playerTrackerRepo";
import { TrackerRepository } from "../trackerRepo";

export class SequelizeTrackerRepository implements TrackerRepository {
    private playerTracker: PlayerTrackerRepository;

    constructor(playerTracker: PlayerTrackerRepository) {
        this.playerTracker = playerTracker;
    }

    async save(tracker: MatchTracker): Promise<void> {
        await this.playerTracker.save(tracker.me);

        if (!!tracker.partner === true) {
            await this.playerTracker.save(tracker.partner!);
        }

        const raw = TrackerMap.toPersistance(tracker);

        const exists = await models.TrackerModel.findOne({
            where: { matchId: tracker.matchId.id.toString() },
        });

        if (!!exists == true) {
            await models.TrackerModel.update(raw, {
                where: { matchId: raw.matchId },
            });
        } else {
            const intance = await models.TrackerModel.create(raw);
            await intance.save();
        }
    }

    async findTrackerByMatchId(matchId: string): Promise<MatchTracker> {
        const raw = await models.TrackerModel.findOne({
            where: { matchId },
        });

        if (!raw) {
            throw new Error("Estadisticas de partido no encontradas.");
        }

        const me = await this.playerTracker.getById(raw.me);
        let partner: any;

        if (!!raw.partner == true) {
            partner = await this.playerTracker.getById(raw.partner!);
        }

        return TrackerMap.toDomain({
            trackerId: raw.trackerId,
            matchId: raw.matchId,
            me,
            partner,
            rivalAces: raw.rivalAces,
            longRallyWon: raw.longRallyWon,
            rivalWinners: raw.rivalWinners,
            breakPtsWinned: raw.breakPtsWinned,
            longRallyLost: raw.longRallyLost,
            shortRallyWon: raw.shortRallyWon,
            mediumRallyWon: raw.mediumRallyWon,
            shortRallyLost: raw.shortRallyLost,
            mediumRallyLost: raw.mediumRallyLost,
            rivalDobleFault: raw.rivalDobleFault,
            gamesWonReturning: raw.gamesWonReturning,
            rivalFirstServIn: raw.rivalFirstServIn,
            rivalFirstServWon: raw.rivalFirstServWon,
            rivalSecondServWon: raw.rivalSecondServWon,
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
        })!;
    }

    async delete(matchId: string): Promise<void> {
        await models.TrackerModel.destroy({ where: { matchId } });
    }
}
