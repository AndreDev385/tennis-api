import { Set } from "../domain/set";
import { Mapper } from "../../../shared/infra/Mapper";
import { SetDto, SetPlayerStatsDto, SetStatsDto } from "../dtos/setDto";
import { SetStats } from "../domain/setStats";
import { SetPlayerStats } from "../domain/playerSetStats";

export class SetMap implements Mapper<Set> {

    private static playerStatsToDomain(raw: any): SetPlayerStats {
        const statsOrError = SetPlayerStats.create(raw);

        statsOrError.isFailure && console.log(statsOrError.getErrorValue());

        return statsOrError.isSuccess ? statsOrError.getValue() : null;
    }

    private static statsToDomain(raw: any): SetStats {
        if (!raw) {
            return null
        }
        const playerStats = this.playerStatsToDomain(raw.me);
        let partnerStats: SetPlayerStats;

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

    private static playerStatsToDto(stats: SetPlayerStats): SetPlayerStatsDto {
        if (!stats) {
            return null
        }
        return {
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
            aces: stats.aces,
            dobleFaults: stats.dobleFaults,
            pointsWinnedFirstReturn: stats.pointsWinnedFirstReturn,
            pointsWinnedSecondReturn: stats.pointsWinnedSecondReturn,
            firstReturnIn: stats.firstReturnIn,
            secondReturnIn: stats.secondReturnIn,
            firstReturnOut: stats.firstReturnOut,
            secondReturnOut: stats.secondReturnOut,
            meshPointsWon: stats.meshPointsWon,
            meshPointsLost: stats.meshPointsLost,
            bckgPointsWon: stats.bckgPointsWon,
            bckgPointsLost: stats.bckgPointsLost,
            winners: stats.winners,
            noForcedErrors: stats.noForcedErrors,
        }
    }

    private static statsToDto(stats: SetStats): SetStatsDto {
        if (!stats) {
            return null
        }
        return {
            me: this.playerStatsToDto(stats.me),
            partner: this.playerStatsToDto(stats.partner) ?? null,
            gamesWonReturning: stats.gamesWonReturning,
            gamesLostReturning: stats.gamesLostReturning,
            winBreakPtsChances: stats.winBreakPtsChances,
            breakPtsWinned: stats.breakPtsWinned,
            rivalPointsWinnedFirstServ: stats.rivalPointsWinnedFirstServ,
            rivalPointsWinnedSecondServ: stats.rivalPointsWinnedSecondServ,
            rivalFirstServIn: stats.rivalFirstServIn,
            rivalSecondServIn: stats.rivalSecondServIn,
            rivalPointsWinnedFirstReturn: stats.rivalPointsWinnedFirstReturn,
            rivalPointsWinnedSecondReturn: stats.rivalPointsWinnedSecondReturn,
            rivalFirstReturnIn: stats.rivalFirstReturnIn,
            rivalSecondReturnIn: stats.rivalSecondReturnIn,
            rivalAces: stats.rivalAces,
            rivalDobleFault: stats.rivalDobleFault,
            rivalNoForcedErrors: stats.rivalNoForcedErrors,
            rivalWinners: stats.rivalWinners,
            shortRallyWon: stats.shortRallyWon,
            mediumRallyWon: stats.mediumRallyWon,
            longRallyWon: stats.longRallyWon,
            shortRallyLost: stats.shortRallyLost,
            mediumRallyLost: stats.mediumRallyLost,
            longRallyLost: stats.longRallyLost,
        }
    }

    public static toPersistance(set: Set) {
        const object = {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
            stats: this.statsToDto(set.stats),
        };

        return JSON.stringify(object);
    }

    public static toDomain(raw: any): Set {
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
            stats: this.statsToDomain(object.stats),
        });

        setOrError.isFailure && console.log(setOrError.getErrorValue());

        return setOrError.isSuccess ? setOrError.getValue() : null;
    }

    public static toDto(set: Set): SetDto {
        return {
            myGames: set.myGames,
            rivalGames: set.rivalGames,
            setWon: set.setWon,
            stats: this.statsToDto(set.stats),
        };
    }
}
