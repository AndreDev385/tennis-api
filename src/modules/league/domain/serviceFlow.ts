import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface SingleServeFlowProps {
    initialPlayer: number;
    servingPlayer: number;
}

export class SingleServeFlow extends ValueObject<SingleServeFlowProps> {
    get initialPlayer(): number {
        return this.props.initialPlayer
    }

    get servingPlayer(): number {
        return this.props.servingPlayer;
    }

    private constructor(props: SingleServeFlowProps) {
        super(props)
    }

    public static create(props: SingleServeFlowProps): Result<SingleServeFlow> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.initialPlayer, argumentName: "jugador inicial" },
            { argument: props.servingPlayer, argumentName: "jugador sacando" },
        ])

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        return Result.ok<SingleServeFlow>(new SingleServeFlow(props));
    }
}
