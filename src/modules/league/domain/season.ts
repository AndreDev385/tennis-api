import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { FinishSeason } from "./events/finishSeason";
import { LeagueId } from "./leagueId";
import { SeasonId } from "./seasonId";

interface SeasonProps {
    name: string;
    leagueId: LeagueId;
    isCurrentSeason?: boolean;
    isFinish?: boolean;
}

export class Season extends AggregateRoot<SeasonProps> {
    get seasonId(): SeasonId {
        return SeasonId.create(this._id).getValue();
    }

    get leagueId(): LeagueId {
        return this.props.leagueId;
    }

    get name(): string {
        return this.props.name;
    }

    get isCurrentSeason(): boolean {
        return this.props.isCurrentSeason;
    }

    get isFinish(): boolean {
        return this.props.isFinish;
    }

    public finishSeason() {
        this.props.isFinish = true;
        this.addDomainEvent(new FinishSeason(this));
    }

    public resumeSeason() {
        this.props.isFinish = false;
    }

    public changeSeason() {
        this.props.isCurrentSeason = false;
    }

    private constructor(props: SeasonProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: SeasonProps,
        id?: UniqueEntityID
    ): Result<Season> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.leagueId, argumentName: "liga" },
            { argument: props.name, argumentName: "nombre" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Season>(guardResult.getErrorValue());
        }

        const season = new Season(
            {
                ...props,
                isFinish: props.isFinish ?? false,
                isCurrentSeason: props.isCurrentSeason ?? true,
            },
            id
        );

        return Result.ok<Season>(season);
    }
}
