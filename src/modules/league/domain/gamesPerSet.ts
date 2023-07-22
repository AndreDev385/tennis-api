import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface GamesPerSetProps {
    value: number;
}

export class GamesPerSet extends ValueObject<GamesPerSetProps> {
    get value(): number {
        return this.props.value;
    }

    private static validate(value: number): boolean {
        const validGames = [4, 6, 9];
        if (typeof value !== "number") {
            return false;
        }

        if (validGames.indexOf(value) < 0) {
            return false;
        }

        return true;
    }

    public static createLeagueDefault(): GamesPerSet {
        return new GamesPerSet({ value: 6 })
    }

    private constructor(props: GamesPerSetProps) {
        super(props);
    }

    public static create(props: GamesPerSetProps): Result<GamesPerSet> {
        const guardResult = Guard.againstNullOrUndefined(props.value, 'juegos por set')

        if (guardResult.isFailure) {
            return Result.fail<GamesPerSet>(guardResult.getErrorValue());
        }

        if (!this.validate(props.value)) {
            return Result.fail<GamesPerSet>("Valor invalido");
        }

        const instance = new GamesPerSet(props);

        return Result.ok<GamesPerSet>(instance);
    }
}
