import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Clash } from "./clubClash";
import { Journey } from "./journey";
import { Match } from "./match";
import { SeasonId } from "./seasonId";
import { Set } from "./set";
import { TeamId } from "./teamId";
import { TeamStatsId } from "./teamStatsId";

interface TeamStatsProps {
    seasonId: SeasonId;
    journey: Journey;
    teamId: TeamId;
    //games
    gamesWonAsLocal: number;
    gamesPlayedAsLocal: number;
    gamesWonAsVisitor: number;
    gamesPlayedAsVisitor: number;
    //sets
    setsWonAsLocal: number;
    setsPlayedAsLocal: number;
    setsWonAsVisitor: number;
    setsPlayedAsVisitor: number;
    // super tie-break
    superTieBreaksWonAsLocal: number;
    superTieBreaksPlayedAsLocal: number;
    superTieBreaksWonAsVisitor: number;
    superTieBreaksPlayedAsVisitor: number;
    // matchs
    matchWonAsLocal: number;
    matchLostAsLocal: number;
    matchPlayedAsLocal: number;
    matchWonAsVisitor: number;
    matchLostAsVisitor: number;
    matchPlayedAsVisitor: number;
    // match won with first set won
    matchsWonWithFirstSetWonAsLocal: number;
    matchsPlayedWithFirstSetWonAsLocal: number;
    matchsWonWithFirstSetWonAsVisitor: number;
    matchsPlayedWithFirstSetWonAsVisitor: number;
    // clash won
    clashWonAsLocal: number;
    clashPlayedAsLocal: number;
    clashWonAsVisitor: number;
    clashPlayedAsVisitor: number;
}

type Stats = Omit<TeamStatsProps, "seasonId" | "journey" | "teamId">

function newTeamStats(): Stats {
    return {
        gamesWonAsLocal: 0,
        gamesPlayedAsLocal: 0,
        gamesWonAsVisitor: 0,
        gamesPlayedAsVisitor: 0,
        //sets
        setsWonAsLocal: 0,
        setsPlayedAsLocal: 0,
        setsWonAsVisitor: 0,
        setsPlayedAsVisitor: 0,
        // super tie-break
        superTieBreaksWonAsLocal: 0,
        superTieBreaksPlayedAsLocal: 0,
        superTieBreaksWonAsVisitor: 0,
        superTieBreaksPlayedAsVisitor: 0,
        // matchs
        matchWonAsLocal: 0,
        matchLostAsLocal: 0,
        matchPlayedAsLocal: 0,
        matchWonAsVisitor: 0,
        matchLostAsVisitor: 0,
        matchPlayedAsVisitor: 0,
        // match won with first set won
        matchsWonWithFirstSetWonAsLocal: 0,
        matchsPlayedWithFirstSetWonAsLocal: 0,
        matchsWonWithFirstSetWonAsVisitor: 0,
        matchsPlayedWithFirstSetWonAsVisitor: 0,
        // clash won
        clashWonAsLocal: 0,
        clashPlayedAsLocal: 0,
        clashWonAsVisitor: 0,
        clashPlayedAsVisitor: 0,
    }
}

const SUPER_TIE_BREAK_POINTS = 10;

export class TeamStats extends Entity<TeamStatsProps> {

    get teamStatsId(): TeamStatsId {
        return TeamStatsId.create(this._id).getValue();
    }

    get seasonId(): SeasonId {
        return this.props.seasonId;
    }
    get journey(): Journey {
        return this.props.journey;
    }
    get teamId(): TeamId {
        return this.props.teamId;
    }
    //games
    get gamesWonAsLocal(): number {
        return this.props.gamesWonAsLocal;
    }
    get gamesPlayedAsLocal(): number {
        return this.props.gamesPlayedAsLocal;
    }

    get gamesWonAsVisitor(): number {
        return this.props.gamesWonAsVisitor;
    }
    get gamesPlayedAsVisitor(): number {
        return this.props.gamesPlayedAsVisitor;
    }

    get totalGamesWon(): number {
        return this.props.gamesWonAsLocal + this.props.gamesWonAsVisitor;
    }

    get totalGamesPlayed(): number {
        return this.props.gamesPlayedAsLocal + this.props.gamesPlayedAsVisitor;
    }
    //sets
    get setsWonAsLocal(): number {
        return this.props.setsWonAsLocal;
    }
    get setsPlayedAsLocal(): number {
        return this.props.setsPlayedAsLocal;
    }
    get setsWonAsVisitor(): number {
        return this.props.setsWonAsVisitor;
    }
    get setsPlayedAsVisitor(): number {
        return this.props.setsPlayedAsVisitor;
    }

    get totalSetsWon(): number {
        return this.props.setsWonAsLocal + this.props.setsWonAsVisitor;
    }

    get totalSetsPlayed(): number {
        return this.props.setsPlayedAsLocal + this.props.setsPlayedAsVisitor;
    }
    // super tie-break
    get superTieBreaksWonAsLocal(): number {
        return this.props.superTieBreaksWonAsLocal;
    }
    get superTieBreaksPlayedAsLocal(): number {
        return this.props.superTieBreaksPlayedAsLocal;
    }
    get superTieBreaksWonAsVisitor(): number {
        return this.props.superTieBreaksWonAsVisitor;
    }
    get superTieBreaksPlayedAsVisitor(): number {
        return this.props.superTieBreaksPlayedAsVisitor;
    }

    get totalSuperTieBreaksWon(): number {
        return (
            this.props.superTieBreaksWonAsLocal +
            this.superTieBreaksWonAsVisitor
        );
    }

    get totalSuperTieBreaksPlayed(): number {
        return (
            this.props.superTieBreaksPlayedAsLocal +
            this.superTieBreaksPlayedAsVisitor
        );
    }
    // matchs
    get matchWonAsLocal(): number {
        return this.props.matchWonAsLocal;
    }
    get matchLostAsLocal(): number {
        return this.props.matchLostAsLocal;
    }
    get matchPlayedAsLocal(): number {
        return this.props.matchPlayedAsLocal;
    }
    get matchWonAsVisitor(): number {
        return this.props.matchWonAsVisitor;
    }
    get matchLostAsVisitor(): number {
        return this.props.matchLostAsVisitor;
    }
    get matchPlayedAsVisitor(): number {
        return this.props.matchPlayedAsVisitor;
    }
    get totalMatchWon(): number {
        return this.props.matchWonAsLocal + this.props.matchWonAsVisitor;
    }
    get totalMatchPlayed(): number {
        return this.props.matchPlayedAsLocal + this.props.matchPlayedAsVisitor;
    }
    // matchs with first set
    get matchsWonWithFirstSetWonAsLocal(): number {
        return this.props.matchsWonWithFirstSetWonAsLocal;
    }
    get matchsPlayedWithFirstSetWonAsLocal(): number {
        return this.props.matchsPlayedWithFirstSetWonAsLocal;
    }
    get matchsWonWithFirstSetWonAsVisitor(): number {
        return this.props.matchsWonWithFirstSetWonAsVisitor;
    }
    get matchsPlayedWithFirstSetWonAsVisitor(): number {
        return this.props.matchsPlayedWithFirstSetWonAsVisitor;
    }

    get totalMatchsWonWithFirstSetWon(): number {
        return (
            this.props.matchsWonWithFirstSetWonAsLocal +
            this.props.matchsWonWithFirstSetWonAsVisitor
        );
    }

    get totalMatchsPlayedWithFirstSetWon(): number {
        return (
            this.props.matchsPlayedWithFirstSetWonAsLocal +
            this.props.matchsPlayedWithFirstSetWonAsVisitor
        );
    }

    get clashWonAsLocal(): number {
        return this.props.clashWonAsLocal;
    }

    get clashPlayedAsLocal(): number {
        return this.props.clashPlayedAsLocal;
    }

    get clashWonAsVisitor(): number {
        return this.props.clashWonAsVisitor;
    }

    get clashPlayedAsVisitor(): number {
        return this.props.clashPlayedAsVisitor;
    }

    get totalClashWon(): number {
        return this.props.clashWonAsVisitor + this.props.clashWonAsLocal;
    }

    get totalClashPlayed(): number {
        return this.props.clashPlayedAsVisitor + this.props.clashPlayedAsLocal;
    }

    private constructor(props: TeamStatsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    addTeamStats(stats: Stats) {
        for (const [key, value] of Object.entries(stats)) {
            this.props[key as keyof Stats] = value
        }
    }

    /*public addClashStats(clash: Clash) {
        for (const match of clash.matchs) {
            this.addSuperTieBreaksStats(match, clash.isLocal);
            this.addFirstSetWonStats(match, clash.isLocal);
            this.addMatchStats(match, clash.isLocal);
            this.addGamesStats(match.sets.getItems(), clash.isLocal);
            this.addSetStats(match.sets.getItems(), clash.isLocal);
        }

        if (clash.isLocal) {
            this.props.clashPlayedAsLocal += 1;
            if (clash.wonClash) this.props.clashWonAsLocal += 1;
        } else {
            this.props.clashPlayedAsVisitor += 1;
            if (clash.wonClash) this.props.clashWonAsVisitor += 1;
        }
    }*/


    public static createEmptyTeamStats(
        seasonId: SeasonId,
        teamId: TeamId,
        journey: Journey
    ): TeamStats {
        return new TeamStats({
            journey: journey,
            teamId: teamId,
            seasonId: seasonId,
            ...newTeamStats(),
        });
    }

    public static create(
        props: TeamStatsProps,
        id?: UniqueEntityID
    ): Result<TeamStats> {
        const result = Guard.againstNullOrUndefinedBulk([
            {
                argument: props.clashPlayedAsLocal,
                argumentName: "encuentros como local",
            },
            {
                argument: props.clashPlayedAsVisitor,
                argumentName: "encuentros como visitante",
            },
            {
                argument: props.clashWonAsLocal,
                argumentName: "encuentros ganados como local",
            },
            {
                argument: props.clashWonAsVisitor,
                argumentName: "encuentros ganados como visitante",
            },

            {
                argument: props.gamesPlayedAsLocal,
                argumentName: "games como local",
            },
            {
                argument: props.gamesPlayedAsVisitor,
                argumentName: "games como visitante",
            },
            {
                argument: props.gamesWonAsLocal,
                argumentName: "games ganados como local",
            },
            {
                argument: props.gamesWonAsVisitor,
                argumentName: "games ganados como visitante",
            },

            {
                argument: props.setsPlayedAsLocal,
                argumentName: "sets como local",
            },
            {
                argument: props.setsPlayedAsVisitor,
                argumentName: "sets como visitante",
            },
            {
                argument: props.setsWonAsLocal,
                argumentName: "sets ganados como local",
            },
            {
                argument: props.setsWonAsVisitor,
                argumentName: "sets ganados como visitante",
            },

            {
                argument: props.superTieBreaksPlayedAsLocal,
                argumentName: "super tie-break como local",
            },
            {
                argument: props.superTieBreaksPlayedAsVisitor,
                argumentName: "super tie-break  como visitante",
            },
            {
                argument: props.superTieBreaksWonAsLocal,
                argumentName: "super tie-break  ganados como local",
            },
            {
                argument: props.superTieBreaksWonAsVisitor,
                argumentName: "super tie-break ganados como visitante",
            },

            {
                argument: props.matchWonAsLocal,
                argumentName: "paridos ganados como local",
            },
            {
                argument: props.matchLostAsLocal,
                argumentName: "paridos perdidos como local",
            },
            {
                argument: props.matchPlayedAsLocal,
                argumentName: "paridos jugados como local",
            },
            {
                argument: props.matchWonAsVisitor,
                argumentName: "paridos ganados como visitante",
            },
            {
                argument: props.matchLostAsVisitor,
                argumentName: "paridos perdidos como visitante",
            },
            {
                argument: props.matchPlayedAsVisitor,
                argumentName: "paridos jugados como visitante",
            },

            {
                argument: props.matchsPlayedWithFirstSetWonAsVisitor,
                argumentName:
                    "paridos jugados ganando el primer set como visitante",
            },
            {
                argument: props.matchsPlayedWithFirstSetWonAsLocal,
                argumentName:
                    "partidos jugados ganando el primer sett como local",
            },
            {
                argument: props.matchsWonWithFirstSetWonAsVisitor,
                argumentName:
                    "partidos ganados ganando el primer set como visitante",
            },
            {
                argument: props.matchsWonWithFirstSetWonAsLocal,
                argumentName:
                    "partidos ganados ganando el primer set como local",
            },

            { argument: props.journey, argumentName: "jornada" },
            { argument: props.seasonId, argumentName: "temporada" },
            { argument: props.teamId, argumentName: "equipo" },
        ]);

        if (result.isFailure) {
            return Result.fail<TeamStats>(result.getErrorValue());
        }

        const instance = new TeamStats(props, id);

        return Result.ok(instance);
    }
}

function addMatchStats(match: Match, isLocal: boolean, stats: Stats) {
    if (match.matchWon === null) {
        return
    }
    if (isLocal) {
        stats.matchPlayedAsLocal += 1;
        if (match.matchWon) stats.matchWonAsLocal += 1;
        else stats.matchLostAsLocal += 1;
    } else {
        stats.matchPlayedAsVisitor += 1;
        if (match.matchWon) stats.matchWonAsVisitor += 1;
        else stats.matchLostAsVisitor += 1;
    }
}

function addSuperTieBreaksStats(match: Match, isLocal: boolean, stats: Stats) {
    if (match.superTieBreak) {
        if (isLocal) {
            stats.superTieBreaksPlayedAsLocal += 1;
            if (match.matchWon) {
                stats.superTieBreaksWonAsLocal += 1;
            }
        } else {
            stats.superTieBreaksPlayedAsVisitor += 1;
            if (match.matchWon) {
                stats.superTieBreaksWonAsVisitor += 1;
            }
        }
    }
}

function addFirstSetWonStats(match: Match, isLocal: boolean, stats: Stats) {
    if (match.sets.getItems()[0].setWon) {
        if (isLocal) {
            stats.matchsPlayedWithFirstSetWonAsLocal += 1;
            if (match.matchWon) {
                stats.matchsWonWithFirstSetWonAsLocal += 1;
            }
        } else {
            stats.matchsPlayedWithFirstSetWonAsVisitor += 1;
            if (match.matchWon) {
                stats.matchsWonWithFirstSetWonAsVisitor += 1;
            }
        }
    }
}

function addSetStats(sets: Set[], isLocal: boolean, stats: Stats) {
    for (const set of sets) {
        if (isLocal) {
            if (set.setWon !== null) {
                stats.setsPlayedAsLocal += 1;
                if (set.setWon) {
                    stats.setsWonAsLocal += 1;
                }
            }
        } else {
            if (set.setWon !== null) {
                stats.setsPlayedAsVisitor += 1;
                if (set.setWon) {
                    stats.setsWonAsVisitor += 1;
                }
            }
        }
    }
}

function addGamesStats(sets: Set[], isLocal: boolean, stats: Stats) {
    for (const set of sets) {
        if (
            set.myGames >= SUPER_TIE_BREAK_POINTS ||
            set.rivalGames >= SUPER_TIE_BREAK_POINTS
        ) {
            return;
        }
        if (isLocal) {
            stats.gamesPlayedAsLocal += set.myGames + set.rivalGames;
            stats.gamesWonAsLocal += set.myGames;
        } else {
            stats.gamesPlayedAsVisitor += set.myGames + set.rivalGames;
            stats.gamesWonAsVisitor += set.myGames;
        }
    }
}

export function calculateTeamStats(clashes: Array<Clash>): Stats {
    const stats = newTeamStats();

    for (const clash of clashes) {

        for (const match of clash.matchs) {
            addSuperTieBreaksStats(match, clash.isLocal, stats);
            addFirstSetWonStats(match, clash.isLocal, stats);
            addMatchStats(match, clash.isLocal, stats);
            addGamesStats(match.sets.getItems(), clash.isLocal, stats);
            addSetStats(match.sets.getItems(), clash.isLocal, stats);
        }

        if (clash.isLocal) {
            stats.clashPlayedAsLocal += 1;
            if (clash.wonClash) stats.clashWonAsLocal += 1;
        } else {
            stats.clashPlayedAsVisitor += 1;
            if (clash.wonClash) stats.clashWonAsVisitor += 1;
        }
    }

    return stats
}
