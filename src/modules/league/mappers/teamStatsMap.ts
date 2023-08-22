import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Mapper } from "../../../shared/infra/Mapper";
import { Journey } from "../domain/journey";
import { SeasonId } from "../domain/seasonId";
import { TeamId } from "../domain/teamId";
import { TeamStats } from "../domain/teamStats";
import { StatsDto } from "../dtos/statsTeamDto";

export class TeamStatsMap implements Mapper<TeamStats> {

    public static toPersistance(stats: TeamStats) {
        return {
            teamStatsId: stats.teamStatsId.id.toString(),
            seasonId: stats.seasonId.id.toString(),
            journey: stats.journey.value,
            teamId: stats.teamId.id.toString(),
            //games
            gamesWonAsLocal: stats.gamesWonAsLocal,
            gamesPlayedAsLocal: stats.gamesPlayedAsLocal,
            gamesWonAsVisitor: stats.gamesWonAsVisitor,
            gamesPlayedAsVisitor: stats.gamesPlayedAsVisitor,
            //sets
            setsWonAsLocal: stats.setsWonAsLocal,
            setsPlayedAsLocal: stats.setsPlayedAsLocal,
            setsWonAsVisitor: stats.setsWonAsVisitor,
            setsPlayedAsVisitor: stats.setsPlayedAsVisitor,
            // super tie-break
            superTieBreaksWonAsLocal: stats.superTieBreaksWonAsLocal,
            superTieBreaksPlayedAsLocal: stats.superTieBreaksPlayedAsLocal,
            superTieBreaksWonAsVisitor: stats.superTieBreaksWonAsVisitor,
            superTieBreaksPlayedAsVisitor: stats.superTieBreaksPlayedAsVisitor,
            // match
            matchWonAsLocal: stats.matchWonAsLocal,
            matchLostAsLocal: stats.matchLostAsLocal,
            matchPlayedAsLocal: stats.matchPlayedAsLocal,
            matchWonAsVisitor: stats.matchWonAsVisitor,
            matchLostAsVisitor: stats.matchLostAsVisitor,
            matchPlayedAsVisitor: stats.matchPlayedAsVisitor,
            // match won with first set won
            matchsWonWithFirstSetWonAsLocal: stats.matchsWonWithFirstSetWonAsLocal,
            matchsPlayedWithFirstSetWonAsLocal: stats.matchsPlayedWithFirstSetWonAsLocal,
            matchsWonWithFirstSetWonAsVisitor: stats.matchsWonWithFirstSetWonAsVisitor,
            matchsPlayedWithFirstSetWonAsVisitor: stats.matchsPlayedWithFirstSetWonAsVisitor,
            // clash won
            clashWonAsLocal: stats.clashWonAsLocal,
            clashPlayedAsLocal: stats.clashPlayedAsLocal,
            clashWonAsVisitor: stats.clashWonAsVisitor,
            clashPlayedAsVisitor: stats.clashPlayedAsVisitor,
        }
    }


    public static toDto(stats: TeamStats): StatsDto {
        return {
            teamStatsId: stats.teamStatsId.id.toString(),
            seasonId: stats.seasonId.id.toString(),
            journey: stats.journey.value,
            teamId: stats.teamId.id.toString(),
            //games
            gamesWonAsLocal: stats.gamesWonAsLocal,
            gamesPlayedAsLocal: stats.gamesPlayedAsLocal,
            gamesWonAsVisitor: stats.gamesWonAsVisitor,
            gamesPlayedAsVisitor: stats.gamesPlayedAsVisitor,
            totalGamesWon: stats.totalGamesWon,
            totalGamesPlayed: stats.totalGamesPlayed,
            //sets
            setsWonAsLocal: stats.setsWonAsLocal,
            setsPlayedAsLocal: stats.setsPlayedAsLocal,
            setsWonAsVisitor: stats.setsWonAsVisitor,
            setsPlayedAsVisitor: stats.setsPlayedAsVisitor,
            totalSetsWon: stats.totalSetsWon,
            totalSetsPlayed: stats.totalSetsPlayed,
            // super tie-break
            superTieBreaksWonAsLocal: stats.superTieBreaksWonAsLocal,
            superTieBreaksPlayedAsLocal: stats.superTieBreaksPlayedAsLocal,
            superTieBreaksWonAsVisitor: stats.superTieBreaksWonAsVisitor,
            superTieBreaksPlayedAsVisitor: stats.superTieBreaksPlayedAsVisitor,
            totalSuperTieBreaksWon: stats.totalSuperTieBreaksWon,
            totalSuperTieBreaksPlayed: stats.totalSuperTieBreaksPlayed,
            // match
            matchWonAsLocal: stats.matchWonAsLocal,
            matchLostAsLocal: stats.matchLostAsLocal,
            matchPlayedAsLocal: stats.matchPlayedAsLocal,
            matchWonAsVisitor: stats.matchWonAsVisitor,
            matchLostAsVisitor: stats.matchLostAsVisitor,
            matchPlayedAsVisitor: stats.matchPlayedAsVisitor,
            totalMatchWon: stats.totalMatchWon,
            totalMatchPlayed: stats.totalMatchPlayed,
            // match won with first set won
            matchsWonWithFirstSetWonAsLocal: stats.matchsWonWithFirstSetWonAsLocal,
            matchsPlayedWithFirstSetWonAsLocal: stats.matchsPlayedWithFirstSetWonAsLocal,
            matchsWonWithFirstSetWonAsVisitor: stats.matchsWonWithFirstSetWonAsVisitor,
            matchsPlayedWithFirstSetWonAsVisitor: stats.matchsPlayedWithFirstSetWonAsVisitor,
            totalMatchsWonWithFirstSetWon: stats.totalMatchsWonWithFirstSetWon,
            totalMatchsPlayedWithFirstSetWon: stats.totalMatchsPlayedWithFirstSetWon,
            // clash won
            clashWonAsLocal: stats.clashWonAsLocal,
            clashPlayedAsLocal: stats.clashPlayedAsLocal,
            clashWonAsVisitor: stats.clashWonAsVisitor,
            clashPlayedAsVisitor: stats.clashPlayedAsVisitor,
            totalClashWon: stats.totalClashWon,
            totalClashPlayed: stats.totalClashPlayed,
        }
    }

    public static toDomain(raw: any) {
        const teamIdOrError = TeamId.create(new UniqueEntityID(raw.teamId));
        const journeyOrError = Journey.create({ value: raw.journey });
        const seasonIdOrError = SeasonId.create(new UniqueEntityID(raw.seasonId));

        const teamStatsOrError = TeamStats.create({
            seasonId: seasonIdOrError.getValue(),
            teamId: teamIdOrError.getValue(),
            journey: journeyOrError.getValue(),
            clashPlayedAsVisitor: raw.clashPlayedAsVisitor,
            clashWonAsLocal: raw.clashWonAsLocal,
            clashPlayedAsLocal: raw.clashPlayedAsLocal,
            clashWonAsVisitor: raw.clashWonAsVisitor,
            gamesWonAsVisitor: raw.gamesWonAsVisitor,
            gamesWonAsLocal: raw.gamesWonAsLocal,
            gamesPlayedAsVisitor: raw.gamesPlayedAsVisitor,
            gamesPlayedAsLocal: raw.gamesPlayedAsLocal,
            setsPlayedAsLocal: raw.setsPlayedAsLocal,
            setsPlayedAsVisitor: raw.setsPlayedAsVisitor,
            setsWonAsLocal: raw.setsWonAsLocal,
            setsWonAsVisitor: raw.setsWonAsVisitor,
            superTieBreaksWonAsLocal: raw.superTieBreaksWonAsLocal,
            superTieBreaksPlayedAsVisitor: raw.superTieBreaksPlayedAsVisitor,
            superTieBreaksPlayedAsLocal: raw.superTieBreaksPlayedAsLocal,
            superTieBreaksWonAsVisitor: raw.superTieBreaksWonAsVisitor,
            matchPlayedAsVisitor: raw.matchPlayedAsVisitor,
            matchLostAsVisitor: raw.matchLostAsVisitor,
            matchWonAsVisitor: raw.matchWonAsVisitor,
            matchPlayedAsLocal: raw.matchPlayedAsLocal,
            matchLostAsLocal: raw.matchLostAsLocal,
            matchWonAsLocal: raw.matchWonAsLocal,
            matchsWonWithFirstSetWonAsVisitor: raw.matchsWonWithFirstSetWonAsVisitor,
            matchsWonWithFirstSetWonAsLocal: raw.matchsWonWithFirstSetWonAsLocal,
            matchsPlayedWithFirstSetWonAsLocal: raw.matchsPlayedWithFirstSetWonAsLocal,
            matchsPlayedWithFirstSetWonAsVisitor: raw.matchsPlayedWithFirstSetWonAsVisitor,
        }, new UniqueEntityID(raw.teamStatsId))

        teamStatsOrError.isFailure ?? console.log(teamStatsOrError.getErrorValue());

        return teamStatsOrError.isSuccess ? teamStatsOrError.getValue() : null;
    }
}
