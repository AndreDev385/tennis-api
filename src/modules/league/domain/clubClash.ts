import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CategoryId } from "./categoryId";
import { ClashId } from "./clashId";
import { ClubId } from "./clubId";
import { Match } from "./match";
import { Matchs } from "./matchs";
import { SeasonId } from "./seasonId";

interface ClubClashProps {
    seasonId: SeasonId;
    matchs: Matchs;
    clubId: ClubId;
    rivalClubId: ClubId;
    categoryId: CategoryId;
    journey: string;
    hostId: ClubId;
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

    get clubId(): ClubId {
        return this.props.clubId;
    }

    get rivalClubId(): ClubId {
        return this.props.rivalClubId;
    }

    get categoryId(): CategoryId {
        return this.props.categoryId;
    }

    get journey(): string {
        return this.props.journey;
    }

    get hostId(): ClubId {
        return this.props.hostId;
    }

    public static create(
        props: ClubClashProps,
        id?: UniqueEntityID
    ): Result<ClubClash> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.seasonId, argumentName: "season id" },
            { argument: props.matchs, argumentName: "matchs" },
            { argument: props.clubId, argumentName: "club" },
            { argument: props.rivalClubId, argumentName: "rival club" },
            { argument: props.categoryId, argumentName: "category" },
            { argument: props.journey, argumentName: "journey" },
            { argument: props.hostId, argumentName: "host" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<ClubClash>(guardResult.getErrorValue());
        }

        const clash = new ClubClash(props, id);

        return Result.ok<ClubClash>(clash);
    }
}
