import { Mapper } from "../../../shared/infra/Mapper";
import { MatchTracker } from "../domain/matchTracker";

export class TrackerMap implements Mapper<MatchTracker> {
    public static toDomain(raw: any): MatchTracker {
        const trackerOrError = MatchTracker.create({
            matchId: raw.matchId,
            me: raw.me,
            partner: raw.partner || null,
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

        trackerOrError.isFailure ? console.log(trackerOrError.getErrorValue()) : "";

        return trackerOrError.isSuccess ? trackerOrError.getValue() : null;
    }

    public static toPersistance(tracker: MatchTracker) {
        return {
            matchId: tracker.matchId.id.toString(),
            me: tracker.me,
            partner: tracker.partner || null,
            rivalAces: tracker.rivalAces,
            longRallyWon: tracker.longRallyWon,
            rivalWinners: tracker.rivalWinners,
            breakPtsWinned: tracker.breakPtsWinned,
            longRallyLost: tracker.longRallyLost,
            shortRallyWon: tracker.shortRallyWon,
            gamesWonServing: tracker.gamesWonServing,
            mediumRallyWon: tracker.mediumRallyWon,
            shortRallyLost: tracker.shortRallyLost,
            gamesLostServing: tracker.gamesLostServing,
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
