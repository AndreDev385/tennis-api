import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { MatchId } from "../domain/matchId";
import { MatchTracker } from "../domain/matchTracker";
import { TrackerDto } from "../dtos/trackerDto";
import { PlayerTrackerMapper } from "./playerTrackerMap";

export class TrackerMap implements Mapper<MatchTracker> {
    public static toDomain(raw: any): MatchTracker {
        const matchIdOrError = MatchId.create(new UniqueEntityID(raw.matchId));
        const trackerOrError = MatchTracker.create(
            {
                matchId: matchIdOrError.getValue(),
                me: raw.me,
                partner: raw?.partner || null,
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
                gamesLostReturning: raw.gamesLostReturning,
                winBreakPtsChances: raw.winBreakPtsChances,
                rivalSecondServIn: raw.rivalSecondServIn,
                rivalFirstReturnIn: raw.rivalFirstReturnIn,
                rivalNoForcedErrors: raw.rivalNoForcedErrors,
                rivalSecondReturnIn: raw.rivalSecondReturnIn,
                rivalPointsWinnedFirstServ: raw.rivalPointsWinnedFirstServ,
                rivalPointsWinnedSecondServ: raw.rivalPointsWinnedSecondServ,
                rivalPointsWinnedFirstReturn: raw.rivalPointsWinnedFirstReturn,
                rivalPointsWinnedSecondReturn:
                    raw.rivalPointsWinnedSecondReturn,
            },
            new UniqueEntityID(raw.trackerId)
        );

        trackerOrError.isFailure
            ? console.log(trackerOrError.getErrorValue(), "TRACKER OR ERROR")
            : "";

        return trackerOrError.isSuccess ? trackerOrError.getValue() : null;
    }

    public static toPersistance(tracker: MatchTracker) {
        return {
            trackerId: tracker.trackerId.id.toString(),
            matchId: tracker.matchId.id.toString(),
            me: tracker.me.playerTrackerId.id.toString(),
            partner: tracker.partner?.playerTrackerId.id.toString() || null,
            rivalAces: tracker.rivalAces,
            longRallyWon: tracker.longRallyWon,
            rivalWinners: tracker.rivalWinners,
            breakPtsWinned: tracker.breakPtsWinned,
            longRallyLost: tracker.longRallyLost,
            shortRallyWon: tracker.shortRallyWon,
            mediumRallyWon: tracker.mediumRallyWon,
            shortRallyLost: tracker.shortRallyLost,
            mediumRallyLost: tracker.mediumRallyLost,
            rivalDobleFault: tracker.rivalDobleFault,
            gamesWonReturning: tracker.gamesWonReturning,
            rivalFirstServIn: tracker.rivalFirstServIn,
            gamesLostReturning: tracker.gamesLostReturning,
            winBreakPtsChances: tracker.winBreakPtsChances,
            rivalSecondServIn: tracker.rivalSecondServIn,
            rivalFirstReturnIn: tracker.rivalFirstReturnIn,
            rivalNoForcedErrors: tracker.rivalNoForcedErrors,
            rivalSecondReturnIn: tracker.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: tracker.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: tracker.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: tracker.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn:
                tracker.rivalPointsWinnedSecondReturn,
        };
    }

    public static toDto(tracker: MatchTracker): TrackerDto {
        return {
            trackerId: tracker.trackerId.id.toString(),
            matchId: tracker.matchId.id.toString(),
            me: PlayerTrackerMapper.toDto(tracker.me),
            partner: tracker.partner
                ? PlayerTrackerMapper.toDto(tracker.partner)
                : null,
            rivalAces: tracker.rivalAces,
            longRallyWon: tracker.longRallyWon,
            rivalWinners: tracker.rivalWinners,
            breakPtsWinned: tracker.breakPtsWinned,
            longRallyLost: tracker.longRallyLost,
            shortRallyWon: tracker.shortRallyWon,
            mediumRallyWon: tracker.mediumRallyWon,
            shortRallyLost: tracker.shortRallyLost,
            mediumRallyLost: tracker.mediumRallyLost,
            rivalDobleFault: tracker.rivalDobleFault,
            gamesWonReturning: tracker.gamesWonReturning,
            rivalFirstServIn: tracker.rivalFirstServIn,
            gamesLostReturning: tracker.gamesLostReturning,
            winBreakPtsChances: tracker.winBreakPtsChances,
            rivalSecondServIn: tracker.rivalSecondServIn,
            rivalFirstReturnIn: tracker.rivalFirstReturnIn,
            rivalNoForcedErrors: tracker.rivalNoForcedErrors,
            rivalSecondReturnIn: tracker.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: tracker.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: tracker.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: tracker.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn:
                tracker.rivalPointsWinnedSecondReturn,
        };
    }
}
