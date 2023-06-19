import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { SeasonId } from "./seasonId";

interface SeasonProps {
    name: string;
}

export class Season extends Entity<SeasonProps> {
    get seasonId(): SeasonId {
        return SeasonId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    public static create(
        props: SeasonProps,
        id?: UniqueEntityID,
    ): Result<Season> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Season>(guardResult.getErrorValue());
        }

        const season = new Season(props, id);

        return Result.ok<Season>(season);
    }
}
