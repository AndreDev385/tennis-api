import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID"; import { ClubId } from "./clubId";

interface ClubProps {
    name: string;
    symbol: string;
    code: string;
    isSubscribed: boolean;
}

export class Club extends Entity<ClubProps> {
    get clubId(): ClubId {
        return ClubId.create(this._id).getValue();
    }

    get name(): string {
        return this.props.name;
    }

    get symbol(): string {
        return this.props.symbol;
    }

    get code(): string {
        return this.props.code;
    }

    get isSubscribed(): boolean {
        return this.props.isSubscribed;
    }

    private generateCode() {
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var len = 6;
        var code = "";

        for (var i = 0; i < len; i++) {
            var indiceAleatorio = Math.floor(Math.random() * characters.length);
            code += characters.charAt(indiceAleatorio);
        }

        this.props.code = code;
    }

    private constructor(props: ClubProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ClubProps, id?: UniqueEntityID): Result<Club> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
            { argument: props.symbol, argumentName: "symbol" },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Club>(guardResult.getErrorValue());
        }

        const isNewClub = !!id == false;

        const club = new Club(
            { ...props, isSubscribed: props.isSubscribed || false },
            id
        );

        if (isNewClub) {
            club.generateCode();
        }

        return Result.ok<Club>(club);
    }
}
