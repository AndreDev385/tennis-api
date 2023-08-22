import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { LeagueId } from "./leagueId";
import { Season } from "./season";
import { Seasons } from "./seasons";

interface LeagueProps {
    name: string;
    seasons: Seasons;
}

export class League extends Entity<LeagueProps> {
    get id(): LeagueId {
        return LeagueId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get seasons(): Array<Season> {
        return this.props.seasons.getItems();
    }

    private constructor(props: LeagueProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(
        props: LeagueProps,
        id: UniqueEntityID,
    ): Result<League> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
            { argument: props.seasons, argumentName: "seasons" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<League>(guardResult.getErrorValue());
        }

        const league = new League(props, id);

        return Result.ok<League>(league);
    }
}
