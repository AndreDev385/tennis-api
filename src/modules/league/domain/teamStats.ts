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

export class TeamStats extends Entity<TeamStatsProps> {

    private SUPER_TIE_BREAK_POINTS = 10;

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
        return this.props.superTieBreaksWonAsLocal + this.superTieBreaksWonAsVisitor;
    }

    get totalSuperTieBreaksPlayed(): number {
        return this.props.superTieBreaksPlayedAsLocal + this.superTieBreaksPlayedAsVisitor;
    }
    // matchs
    get matchWonAsLocal(): number {
        return this.props.matchWonAsLocal
    }
    get matchLostAsLocal(): number {
        return this.props.matchLostAsLocal
    }
    get matchPlayedAsLocal(): number {
        return this.props.matchPlayedAsLocal
    }
    get matchWonAsVisitor(): number {
        return this.props.matchWonAsVisitor
    }
    get matchLostAsVisitor(): number {
        return this.props.matchLostAsVisitor
    }
    get matchPlayedAsVisitor(): number {
        return this.props.matchPlayedAsVisitor
    }
    get totalMatchWon(): number {
        return this.props.matchWonAsLocal + this.props.matchWonAsVisitor
    }
    get totalMatchPlayed(): number {
        return this.props.matchPlayedAsLocal + this.props.matchPlayedAsVisitor
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
        return this.props.matchsWonWithFirstSetWonAsLocal + this.props.matchsWonWithFirstSetWonAsVisitor;
    }

    get totalMatchsPlayedWithFirstSetWon(): number {
        return this.props.matchsPlayedWithFirstSetWonAsLocal + this.props.matchsPlayedWithFirstSetWonAsVisitor;
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

    public addClashStats(clash: Clash) {
        for (const match of clash.matchs) {
            this.addSuperTieBreaksStats(match, clash.isLocal)
            this.addFirstSetWonStats(match, clash.isLocal)
            this.addMatchStats(match, clash.isLocal)
            this.addGamesStats(match.sets.getItems(), clash.isLocal)
            this.addSetStats(match.sets.getItems(), clash.isLocal)
        }

        if (clash.isLocal) {
            this.props.clashPlayedAsLocal += 1;
            if (clash.wonClash) this.props.clashWonAsLocal += 1;
        } else {
            this.props.clashPlayedAsVisitor += 1;
            if (clash.wonClash) this.props.clashWonAsVisitor += 1
        }
    }

    private addMatchStats(match: Match, isLocal: boolean) {
        console.log("[ADD MATCH STATS EXECUTED]");
        if (isLocal) {
            console.log("[Played as Local]");
            this.props.matchPlayedAsLocal += 1;
            if (!!match.isCancelled === true) return;
            if (match.matchWon) this.props.matchWonAsLocal += 1;
            else this.props.matchLostAsLocal += 1;
        } else {
            console.log("[Played as Visitor]");
            this.props.matchPlayedAsVisitor += 1;
            if (!!match.isCancelled === true) return;
            if (match.matchWon) this.props.matchWonAsVisitor += 1;
            else this.props.matchLostAsVisitor += 1;
        }
    }

    private addSuperTieBreaksStats(match: Match, isLocal: boolean) {
        if (match.superTieBreak) {
            if (isLocal) {
                this.props.superTieBreaksPlayedAsLocal += 1
                if (match.matchWon) {
                    this.props.superTieBreaksWonAsLocal += 1
                }
            } else {
                this.props.superTieBreaksPlayedAsVisitor += 1
                if (match.matchWon) {
                    this.props.superTieBreaksWonAsVisitor += 1
                }
            }
        }
    }

    private addFirstSetWonStats(match: Match, isLocal: boolean) {
        if (match.sets.getItems()[0].setWon) {
            if (isLocal) {
                this.props.matchsPlayedWithFirstSetWonAsLocal += 1;
                if (match.matchWon) {
                    this.props.matchsWonWithFirstSetWonAsLocal += 1;
                }
            } else {
                this.props.matchsPlayedWithFirstSetWonAsVisitor += 1;
                if (match.matchWon) {
                    this.props.matchsWonWithFirstSetWonAsVisitor += 1;
                }
            }
        }
    }

    private addSetStats(sets: Set[], isLocal: boolean) {
        for (const set of sets) {
            if (isLocal) {
                if (set.setWon !== null) {
                    this.props.setsPlayedAsLocal += 1;
                    if (set.setWon) {
                        this.props.setsWonAsLocal += 1
                    }
                }
            } else {
                if (set.setWon !== null) {
                    this.props.setsPlayedAsVisitor += 1;
                    if (set.setWon) {
                        this.props.setsWonAsVisitor += 1
                    }
                }
            }
        }
    }

    private addGamesStats(sets: Set[], isLocal: boolean) {
        for (const set of sets) {
            if (set.myGames >= this.SUPER_TIE_BREAK_POINTS || set.rivalGames >= this.SUPER_TIE_BREAK_POINTS) {
                return;
            }
            if (isLocal) {
                this.props.gamesPlayedAsLocal += (set.myGames + set.rivalGames)
                this.props.gamesWonAsLocal += set.myGames;
            } else {
                this.props.gamesPlayedAsVisitor += (set.myGames + set.rivalGames)
                this.props.gamesWonAsVisitor += set.myGames;
            }
        }
    }

    public static createEmptyTeamStats(seasonId: SeasonId, teamId: TeamId, journey: Journey): TeamStats {
        return new TeamStats({
            journey: journey,
            teamId: teamId,
            seasonId: seasonId,

            clashPlayedAsLocal: 0,
            clashPlayedAsVisitor: 0,
            clashWonAsLocal: 0,
            clashWonAsVisitor: 0,

            matchPlayedAsLocal: 0,
            matchPlayedAsVisitor: 0,
            matchWonAsLocal: 0,
            matchWonAsVisitor: 0,
            matchLostAsVisitor: 0,
            matchLostAsLocal: 0,

            gamesPlayedAsLocal: 0,
            gamesPlayedAsVisitor: 0,
            gamesWonAsLocal: 0,
            gamesWonAsVisitor: 0,

            setsPlayedAsLocal: 0,
            setsPlayedAsVisitor: 0,
            setsWonAsLocal: 0,
            setsWonAsVisitor: 0,

            superTieBreaksPlayedAsLocal: 0,
            superTieBreaksPlayedAsVisitor: 0,
            superTieBreaksWonAsLocal: 0,
            superTieBreaksWonAsVisitor: 0,

            matchsPlayedWithFirstSetWonAsVisitor: 0,
            matchsPlayedWithFirstSetWonAsLocal: 0,
            matchsWonWithFirstSetWonAsVisitor: 0,
            matchsWonWithFirstSetWonAsLocal: 0,
        })
    }

    public static create(props: TeamStatsProps, id?: UniqueEntityID): Result<TeamStats> {
        const result = Guard.againstNullOrUndefinedBulk([
            { argument: props.clashPlayedAsLocal, argumentName: 'encuentros como local' },
            { argument: props.clashPlayedAsVisitor, argumentName: 'encuentros como visitante' },
            { argument: props.clashWonAsLocal, argumentName: 'encuentros ganados como local' },
            { argument: props.clashWonAsVisitor, argumentName: 'encuentros ganados como visitante' },

            { argument: props.gamesPlayedAsLocal, argumentName: 'games como local' },
            { argument: props.gamesPlayedAsVisitor, argumentName: 'games como visitante' },
            { argument: props.gamesWonAsLocal, argumentName: 'games ganados como local' },
            { argument: props.gamesWonAsVisitor, argumentName: 'games ganados como visitante' },

            { argument: props.setsPlayedAsLocal, argumentName: 'sets como local' },
            { argument: props.setsPlayedAsVisitor, argumentName: 'sets como visitante' },
            { argument: props.setsWonAsLocal, argumentName: 'sets ganados como local' },
            { argument: props.setsWonAsVisitor, argumentName: 'sets ganados como visitante' },

            { argument: props.superTieBreaksPlayedAsLocal, argumentName: 'super tie-break como local' },
            { argument: props.superTieBreaksPlayedAsVisitor, argumentName: 'super tie-break  como visitante' },
            { argument: props.superTieBreaksWonAsLocal, argumentName: 'super tie-break  ganados como local' },
            { argument: props.superTieBreaksWonAsVisitor, argumentName: 'super tie-break ganados como visitante' },

            { argument: props.matchWonAsLocal, argumentName: 'paridos ganados como local' },
            { argument: props.matchLostAsLocal, argumentName: 'paridos perdidos como local' },
            { argument: props.matchPlayedAsLocal, argumentName: 'paridos jugados como local' },
            { argument: props.matchWonAsVisitor, argumentName: 'paridos ganados como visitante' },
            { argument: props.matchLostAsVisitor, argumentName: 'paridos perdidos como visitante' },
            { argument: props.matchPlayedAsVisitor, argumentName: 'paridos jugados como visitante' },

            { argument: props.matchsPlayedWithFirstSetWonAsVisitor, argumentName: 'paridos jugados ganando el primer set como visitante' },
            { argument: props.matchsPlayedWithFirstSetWonAsLocal, argumentName: 'partidos jugados ganando el primer sett como local' },
            { argument: props.matchsWonWithFirstSetWonAsVisitor, argumentName: 'partidos ganados ganando el primer set como visitante' },
            { argument: props.matchsWonWithFirstSetWonAsLocal, argumentName: 'partidos ganados ganando el primer set como local' },

            { argument: props.journey, argumentName: "jornada" },
            { argument: props.seasonId, argumentName: "temporada" },
            { argument: props.teamId, argumentName: "equipo" },
        ])

        if (result.isFailure) {
            return Result.fail<TeamStats>(result.getErrorValue());
        }

        const instance = new TeamStats(props, id);

        return Result.ok(instance);
    }
}
