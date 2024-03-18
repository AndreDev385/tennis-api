import { Set } from "../domain/set";
import { Mapper } from "../../../shared/infra/Mapper";
import { SetDto, SetPlayerStatsDto, SetStatsDto } from "../dtos/setDto";
import { SetStats } from "../domain/setStats";
import { SetPlayerStats } from "../domain/playerSetStats";

export class SetMap implements Mapper<Set> {

    private static playerStatsToDomain(raw: any): SetPlayerStats | null {
        const statsOrError = SetPlayerStats.create(raw);

        statsOrError.isFailure && console.log(statsOrError.getErrorValue());

        return statsOrError.isSuccess ? statsOrError.getValue() : null;
    }

    private static statsToDomain(raw: any): SetStats | null {
        if (!raw) {
            return null
        }
        const playerStats = this.playerStatsToDomain(raw.me);
        let partnerStats: SetPlayerStats | null = null;

        if (raw.partner) {
            partnerStats = this.playerStatsToDomain(raw.partner);
        }

        const statsOrError = SetStats.create({
            ...raw,
            partner: partnerStats,
            me: playerStats,
        });

        statsOrError.isFailure && console.log(statsOrError.getErrorValue());

        return statsOrError.isSuccess ? statsOrError.getValue() : null;
    }

    private static playerStatsToDto(stats: SetPlayerStats | null | undefined): SetPlayerStatsDto | null {
        if (!stats) {
            return null
        }
        return {
            isDouble: stats.isDouble,
            pointsWon: stats.pointsWon,
            pointsWonServing: stats.pointsWonServing,
            pointsWonReturning: stats.pointsWonReturning,
            pointsLost: stats.pointsLost,
            pointsLostReturning: stats.pointsLostReturning,
            pointsLostServing: stats.pointsLostServing,
            saveBreakPtsChances: stats.saveBreakPtsChances,
            breakPtsSaved: stats.breakPtsSaved,
            gamesWonServing: stats.gamesWonServing,
            gamesLostServing: stats.gamesLostServing,
            pointsWinnedFirstServ: stats.pointsWinnedFirstServ,
            pointsWinnedSecondServ: stats.pointsWinnedSecondServ,
            firstServIn: stats.firstServIn,
            secondServIn: stats.secondServIn,
            firstServWon: stats.firstServWon,
            secondServWon: stats.secondServWon,
            aces: stats.aces,
            dobleFaults: stats.dobleFaults,
            pointsWinnedFirstReturn: stats.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: stats.pointsWinnedSecondReturn,
            firstReturnIn: stats.firstReturnIn,
            secondReturnIn: stats.secondReturnIn,
            firstReturnOut: stats.firstReturnOut,
            secondReturnOut: stats.secondReturnOut,
            firstReturnWon: stats.firstReturnWon,
            secondReturnWon: stats.secondReturnWon,
            firstReturnWinner: stats.firstReturnWinner,
            secondReturnWinner: stats.secondReturnWinner,
            meshPointsWon: stats.meshPointsWon,
            meshPointsLost: stats.meshPointsLost,
            meshError: stats.meshError,
            meshWinner: stats.meshWinner,
            bckgPointsWon: stats.bckgPointsWon,
            bckgPointsLost: stats.bckgPointsLost,
            bckgError: stats.bckgError,
            bckgWinner: stats.bckgWinner,
        }
    }

    private static statsToDto(stats?: SetStats | null): SetStatsDto | null {
        if (!stats) {
            return null
        }
        return {
            me: this.playerStatsToDto(stats.me)!,
            partner: this.playerStatsToDto(stats.partner),
            breakPtsWinned: stats.breakPtsWinned,
            winBreakPtsChances: stats.winBreakPtsChances,
            gamesWonReturning: stats.gamesWonReturning,
            gamesLostReturning: stats.gamesLostReturning,
            rivalAces: stats.rivalAces,
            rivalDobleFault: stats.rivalDobleFault,
            rivalFirstServIn: stats.rivalFirstServIn,
            rivalSecondServIn: stats.rivalSecondServIn,
            rivalFirstServWon: stats.rivalFirstServWon,
            rivalSecondServWon: stats.rivalSecondServWon,
            rivalWinners: stats.rivalWinners,
            rivalNoForcedErrors: stats.rivalNoForcedErrors,
            rivalFirstReturnIn: stats.rivalFirstReturnIn,
            rivalSecondReturnIn: stats.rivalSecondReturnIn,
            rivalPointsWinnedFirstServ: stats.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: stats.rivalPointsWinnedSecondServ,
            rivalPointsWinnedFirstReturn: stats.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn:
                stats.rivalPointsWinnedSecondReturn,
            shortRallyWon: stats.shortRallyWon,
            shortRallyLost: stats.shortRallyLost,
            mediumRallyWon: stats.mediumRallyWon,
            mediumRallyLost: stats.mediumRallyLost,
            longRallyWon: stats.longRallyWon,
            longRallyLost: stats.longRallyLost,
        }
    }

    public static toPersistance(set: Set) {
        const object = {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
            tiebreak: set.tiebreak,
            superTiebreak: set.superTiebreak,
            myTiebreakPoints: set.myTiebreakPoints,
            rivalTiebreakPoints: set.rivalTiebreakPoints,
            stats: this.statsToDto(set.stats),
        };

        return JSON.stringify(object);
    }

    public static toDomain(raw: SetDto | string): Set | null {
        let object: any;
        if (typeof raw == 'string') {
            object = JSON.parse(raw);
        } else {
            object = raw;
        }

        const setOrError = Set.create({
            setWon: object.setWon,
            myGames: object.myGames,
            rivalGames: object.rivalGames,
            tiebreak: object.tiebreak ?? false,
            superTiebreak: object.superTiebreak ?? false,
            myTiebreakPoints: object.myTiebreakPoints ?? 0,
            rivalTiebreakPoints: object.rivalTiebreakPoints ?? 0,
            stats: this.statsToDomain(object.stats),
        });

        setOrError.isFailure && console.log(setOrError.getErrorValue());

        return setOrError.isSuccess ? setOrError.getValue() : null;
    }

    public static toDto(set: Set): SetDto {
        return {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon ?? null,
            tiebreak: set.tiebreak,
            superTiebreak: set.superTiebreak,
            myTiebreakPoints: set.myTiebreakPoints,
            rivalTiebreakPoints: set.rivalTiebreakPoints,
            stats: this.statsToDto(set.stats),
        };
    }
}
