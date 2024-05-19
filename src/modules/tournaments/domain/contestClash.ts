import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ContestClashId } from "./contestClashId";
import { ContestId } from "./contestId";
import { ContestTeam } from "./contestTeam";
import { TournamentMatchesIds } from "./tournamentMatches";

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

    public setFinish(value: boolean) {
        this.props.isFinish = value;
    }

    public setT1WonClash(value: boolean) {
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
