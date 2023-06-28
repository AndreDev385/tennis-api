import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { ClashId } from "./clashId";
import { Journey } from "./journey";
import { Match } from "./match";
import { Matchs } from "./matchs";
import { SeasonId } from "./seasonId";
import { Team } from "./team";

interface ClubClashProps {
    seasonId: SeasonId;
    matchs: Matchs;
    team1: Team;
    team2: Team;
    category: Category;
    journey: Journey;
    host: string;
}

export class Clash extends Entity<ClubClashProps> {
    get clashId(): ClashId {
        return ClashId.create(this._id).getValue();
    }

    get seasonId(): SeasonId {
        return this.props.seasonId;
    }

    get matchs(): Array<Match> {
        return this.props.matchs.getItems();
    }

    get team1(): Team {
        return this.props.team1;
    }

    get team2(): Team {
        return this.props.team2;
    }

    get category(): Category {
        return this.props.category;
    }

    get journey(): Journey {
        return this.props.journey;
    }

    get host(): string {
        return this.props.host;
    }

    public static create(
        props: ClubClashProps,
        id?: UniqueEntityID
    ): Result<Clash> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.seasonId, argumentName: "season id" },
            { argument: props.matchs, argumentName: "matchs" },
            { argument: props.team1, argumentName: "team 1" },
            { argument: props.team2, argumentName: "team 2" },
            { argument: props.category, argumentName: "category" },
            { argument: props.journey, argumentName: "journey" },
            { argument: props.host, argumentName: "host" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Clash>(guardResult.getErrorValue());
        }

        const clash = new Clash(props, id);

        return Result.ok<Clash>(clash);
    }
}
