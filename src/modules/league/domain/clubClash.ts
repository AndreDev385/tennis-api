import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { ClashId } from "./clashId";
import { Club } from "./club";
import { Match } from "./match";
import { Matchs } from "./matchs";
import { SeasonId } from "./seasonId";

interface ClubClashProps {
    seasonId: SeasonId;
    matchs: Matchs;
    club: Club;
    rivalClub: Club;
    category: Category;
    journey: string;
    host: Club;
}

export class ClubClash extends Entity<ClubClashProps> {
    get clashId(): ClashId {
        return ClashId.create(this._id).getValue();
    }

    get seasonId(): SeasonId {
        return this.props.seasonId;
    }

    get matchs(): Array<Match> {
        return this.props.matchs.getItems();
    }

    get club(): Club {
        return this.props.club;
    }

    get rivalClub(): Club {
        return this.props.rivalClub;
    }

    get category(): Category {
        return this.props.category;
    }

    get journey(): string {
        return this.props.journey;
    }

    get host(): Club {
        return this.props.host;
    }

    public static create(
        props: ClubClashProps,
        id?: UniqueEntityID
    ): Result<ClubClash> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.seasonId, argumentName: "season id" },
            { argument: props.matchs, argumentName: "matchs" },
            { argument: props.club, argumentName: "club" },
            { argument: props.rivalClub, argumentName: "rival club" },
            { argument: props.category, argumentName: "category" },
            { argument: props.journey, argumentName: "journey" },
            { argument: props.host, argumentName: "host" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<ClubClash>(guardResult.getErrorValue());
        }

        const clash = new ClubClash(props, id);

        return Result.ok<ClubClash>(clash);
    }
}
