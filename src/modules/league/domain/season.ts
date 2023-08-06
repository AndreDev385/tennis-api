import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { FinishSeason } from "./events/finishSeason";
import { SeasonId } from "./seasonId";

interface SeasonProps {
    name: string;
    isCurrentSeason?: boolean;
    isFinish?: boolean;
}

export class Season extends AggregateRoot<SeasonProps> {
    get seasonId(): SeasonId {
        return SeasonId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get isCurrentSeason(): boolean {
        return this.isCurrentSeason;
    }

    get isFinish(): boolean {
        return this.isFinish;
    }

    public finishSeason() {
        this.props.isFinish = true;
        this.props.isCurrentSeason = false;
        this.addDomainEvent(new FinishSeason(this));
    }

    private constructor(props: SeasonProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: SeasonProps,
        id?: UniqueEntityID
    ): Result<Season> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
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
