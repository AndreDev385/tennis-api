import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { ServiceOrder } from "./serviceOrder";

interface ServiceFlowProps {
    value: Array<number>;
}

export class ServiceFlow extends ValueObject<ServiceFlowProps> {

    get value(): Array<number> {
        return this.props.value;
    }

    private static validateLength(value: Array<number>): boolean {
        return value.length == 4;
    }

    private static validateValues(value: Array<number>): boolean {
        for (const n of value) {
            if (n < 0 || n > 3) {
                return false
            }
        }
        return true;
    }

    private constructor(props: ServiceFlowProps) {
        super(props);
    }

    public static create(props: ServiceFlowProps): Result<ServiceFlow> {
        if (!this.validateLength(props.value)) {
            return Result.fail("Longitud de flujo invalida");
        }

        if (!this.validateValues(props.value)) {
            return Result.fail("Valores incorrectos");
        }

        const instance = new ServiceFlow(props);

        return Result.ok<ServiceFlow>(instance);
    }

}


interface DoubleServeFlowProps {
    initialTeam: number;
    isFlowComplete: boolean;
    actualSetOrder: number;
    servingTeam: number;
    servingPlayer: number;
    returningPlayer: number;
    initialServingPlayer: number;
    initialReturningPlayer: number;
    setNextFlow: boolean;
    firstGameFlow: ServiceFlow;
    secondGameFlow: ServiceFlow;
    thirdGameFlow: ServiceFlow;
    fourGameFlow: ServiceFlow;
    order: ServiceOrder;
    tiebreakFirstPointDone: boolean;
}

export class DoubleServeFlow extends ValueObject<DoubleServeFlowProps> {
    get order(): ServiceOrder {
        return this.props.order;
    }
    get fourGameFlow(): ServiceFlow {
        return this.props.fourGameFlow;
    }
    get thirdGameFlow(): ServiceFlow {
        return this.props.thirdGameFlow;
    }
    get secondGameFlow(): ServiceFlow {
        return this.props.secondGameFlow;
    }
    get firstGameFlow(): ServiceFlow {
        return this.props.firstGameFlow;
    }
    get setNextFlow(): boolean {
        return this.props.setNextFlow;
    }
    get initialReturningPlayer(): number {
        return this.props.initialReturningPlayer;
    }
    get initialServingPlayer(): number {
        return this.props.initialServingPlayer;
    }
    get returningPlayer(): number {
        return this.props.returningPlayer;
    }
    get servingPlayer(): number {
        return this.props.servingPlayer;
    }
    get servingTeam(): number {
        return this.props.servingTeam;
    }
    get actualSetOrder(): number {
        return this.props.actualSetOrder;
    }
    get isFlowComplete(): boolean {
        return this.props.isFlowComplete;
    }
    get initialTeam(): number {
        return this.props.initialTeam;
    }
    get tiebreakFirstPointDone(): boolean {
        return this.props.tiebreakFirstPointDone;
    }

    private constructor(props: DoubleServeFlowProps) {
        super(props);
    }

    public static create(props: DoubleServeFlowProps): Result<DoubleServeFlow> {
        const guard = Guard.againstNullOrUndefinedBulk([
            { argument: props.initialTeam, argumentName: "equipo inicial" },
            { argument: props.isFlowComplete, argumentName: "flujo completo" },
            { argument: props.actualSetOrder, argumentName: "orden actual" },
            { argument: props.servingTeam, argumentName: "equipo que saca" },
            { argument: props.servingPlayer, argumentName: "jugador sacando" },
            { argument: props.returningPlayer, argumentName: "jugador devolviendo" },
            { argument: props.initialServingPlayer, argumentName: "primer jugador en sacar" },
            { argument: props.initialReturningPlayer, argumentName: "primar jugador en devolver" },
            { argument: props.setNextFlow, argumentName: "configurar segundo flujo" },
            { argument: props.firstGameFlow, argumentName: "flujo primer juego" },
            { argument: props.secondGameFlow, argumentName: "flujo segundo juego" },
            { argument: props.thirdGameFlow, argumentName: "flujo tercer juego" },
            { argument: props.fourGameFlow, argumentName: "flujo cuarto juego" },
            { argument: props.order, argumentName: "orden" },
        ])

        if (guard.isFailure) {
            return Result.fail(guard.getErrorValue());
        }

        const instance = new DoubleServeFlow(props)

        return Result.ok(instance);
    }
}
