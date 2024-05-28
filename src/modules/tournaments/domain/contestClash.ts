import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ContestClashId } from "./contestClashId";
import { ContestId } from "./contestId";
import { ContestTeam } from "./contestTeam";
import { ContestClashFinished } from "./events/contestClashFinished";
import { TournamentMatch } from "./tournamentMatch";
import { TournamentMatchesIds } from "./tournamentMatches";
import { TournamentRules } from "./tournamentRules";

type ContestClashProps = {
    contestId: ContestId;
    team1: ContestTeam;
    team2: ContestTeam;
    matchIds: TournamentMatchesIds;
    t1WonClash?: boolean | null;
    isFinish?: boolean;
};

export class ContestClash extends AggregateRoot<ContestClashProps> {
    get contestClashId() {
        return ContestClashId.create(this._id).getValue();
    }
    get contestId(): ContestId {
        return this.props.contestId;
    }
    get team1(): ContestTeam {
        return this.props.team1;
    }
    get team2(): ContestTeam {
        return this.props.team2;
    }
    get matchIds(): TournamentMatchesIds {
        return this.props.matchIds;
    }
    get isFinish(): boolean {
        return this.props.isFinish!;
    }
    get t1WonClash(): boolean | null {
        return this.props.t1WonClash!;
    }

    public setMatches(ids: TournamentMatchesIds) {
        this.props.matchIds = ids;
    }

    public checkIsFinish(
        matches: TournamentMatch[],
        rules: TournamentRules
    ): Result<boolean> {
        if (matches.length != this.matchIds.getItems().length) {
            return Result.fail(
                `Los paridos de este encuentro no coinciden con los partidos propocionados`
            );
        }

        for (const m of matches) {
            const exist = this.matchIds.exists(m.matchId);
            if (!exist) {
                return Result.fail(
                    `${m.matchId} no pertenece a este encuentro`
                );
            }
        }

        const matchesFinished = matches.filter((m) => m.matchWon != null);
        const matchesNeededToWin =
            Math.floor(rules.matchesPerClash!.value / 2) + 1;

        const t1MatchesWon = matchesFinished.filter((m) => m.matchWon);
        const t2MatchesWon = matchesFinished.filter((m) => !m.matchWon);

        const TEAM_1_WIN = t1MatchesWon.length >= matchesNeededToWin;
        const TEAM_2_WIN = t2MatchesWon.length >= matchesNeededToWin;

        if (!TEAM_1_WIN && !TEAM_2_WIN) {
            return Result.ok(false);
        }

        this.props.isFinish = true;
        this.setT1WonClash(TEAM_1_WIN);
        this.addDomainEvent(new ContestClashFinished(this));
        return Result.ok(true)
    }

    private setT1WonClash(value: boolean) {
        this.props.t1WonClash = value;
    }

    private constructor(props: ContestClashProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: ContestClashProps,
        id?: UniqueEntityID
    ): Result<ContestClash> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.matchIds, argumentName: "Partidos" },
            { argument: props.team1, argumentName: "Equipo 1" },
            { argument: props.team2, argumentName: "Equipo 2" },
            { argument: props.contestId, argumentName: "Id de competencia" },
        ]);

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        return Result.ok(
            new ContestClash(
                {
                    ...props,
                    isFinish: props.isFinish ?? false,
                    t1WonClash: props.t1WonClash ?? null,
                },
                id
            )
        );
    }
}
