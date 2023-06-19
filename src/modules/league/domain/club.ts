import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { ClubId } from "./clubId";

interface ClubProps {
    name: string;
    symbol: string;
    address: string;
}

export class Club extends Entity<ClubProps> {
    get clubId(): ClubId {
        return ClubId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get symbol(): string {
        return this.props.symbol
    }

    get address(): string {
        return this.props.address
    }

    public static create(props: ClubProps, id?: UniqueEntityID): Result<Club> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.symbol, argumentName: 'symbol' },
            { argument: props.address, argumentName: 'addres' },
        ])

        if (guardResult.isFailure) {
            return Result.fail<Club>(guardResult.getErrorValue());
        }

        const club = new Club(props, id);

        return Result.ok<Club>(club);
    }
}
