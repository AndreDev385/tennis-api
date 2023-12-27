import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { MatchId } from "../domain/matchId";
import { MatchTracker } from "../domain/matchTracker";
import { TrackerDto } from "../dtos/trackerDto";
import { PlayerTrackerMapper } from "./playerTrackerMap";

export class TrackerMap implements Mapper<MatchTracker> {
    public static toDomain(raw: any): MatchTracker | null {
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
            breakPtsWinned: tracker.breakPtsWinned,
            winBreakPtsChances: tracker.winBreakPtsChances,
            gamesWonReturning: tracker.gamesWonReturning,
            gamesLostReturning: tracker.gamesLostReturning,
            rivalAces: tracker.rivalAces,
            rivalDobleFault: tracker.rivalDobleFault,
            rivalFirstServIn: tracker.rivalFirstServIn,
            rivalSecondServIn: tracker.rivalSecondServIn,
            rivalFirstServWon: tracker.rivalFirstServWon,
            rivalSecondServWon: tracker.rivalSecondServWon,
            rivalWinners: tracker.rivalWinners,
            rivalNoForcedErrors: tracker.rivalNoForcedErrors,
            rivalFirstReturnIn: tracker.rivalFirstReturnIn,
            rivalSecondReturnIn: tracker.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: tracker.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: tracker.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: tracker.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn:
                tracker.rivalPointsWinnedSecondReturn,
            shortRallyWon: tracker.shortRallyWon,
            shortRallyLost: tracker.shortRallyLost,
            mediumRallyWon: tracker.mediumRallyWon,
            mediumRallyLost: tracker.mediumRallyLost,
            longRallyWon: tracker.longRallyWon,
            longRallyLost: tracker.longRallyLost,
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
            breakPtsWinned: tracker.breakPtsWinned,
            winBreakPtsChances: tracker.winBreakPtsChances,
            gamesWonReturning: tracker.gamesWonReturning,
            gamesLostReturning: tracker.gamesLostReturning,
            rivalAces: tracker.rivalAces,
            rivalDobleFault: tracker.rivalDobleFault,
            rivalFirstServIn: tracker.rivalFirstServIn,
            rivalSecondServIn: tracker.rivalSecondServIn,
            rivalFirstServWon: tracker.rivalFirstServWon,
            rivalSecondServWon: tracker.rivalSecondServWon,
            rivalWinners: tracker.rivalWinners,
            rivalNoForcedErrors: tracker.rivalNoForcedErrors,
            rivalFirstReturnIn: tracker.rivalFirstReturnIn,
            rivalSecondReturnIn: tracker.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: tracker.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: tracker.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: tracker.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn:
                tracker.rivalPointsWinnedSecondReturn,
            shortRallyWon: tracker.shortRallyWon,
            shortRallyLost: tracker.shortRallyLost,
            mediumRallyWon: tracker.mediumRallyWon,
            mediumRallyLost: tracker.mediumRallyLost,
            longRallyWon: tracker.longRallyWon,
            longRallyLost: tracker.longRallyLost,
        }
    };
}
