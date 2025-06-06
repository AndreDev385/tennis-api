import { Mapper } from "../../../shared/infra/Mapper";
import { DoubleServeFlow, ServiceFlow } from "../domain/doubleServeFlow";
import { SingleServeFlow } from "../domain/serviceFlow";
import { ServiceOrder } from "../domain/serviceOrder";

export class SingleServeFlowMap implements Mapper<SingleServeFlow> {
    public static toDto(flow: SingleServeFlow | null | undefined) {
        if (!flow) {
            return null
        }
        return {
            initialPlayer: flow.initialPlayer,
            servingPlayer: flow.servingPlayer,
        }
    }

    public static toDomain(raw: any): SingleServeFlow | null {
        let obj: any;
        if (typeof raw == 'string') {
            obj = JSON.parse(raw);
        } else {
            obj = raw;
        }
        if (!obj) {
            return null;
        }

        const flowOrError = SingleServeFlow.create({
            servingPlayer: obj.servingPlayer,
            initialPlayer: obj.initialPlayer,
        })

        flowOrError.isFailure && console.log(flowOrError.getErrorValue(), "firstServeFlowError")

        return flowOrError.isSuccess ? flowOrError.getValue() : null;
    }
}

export class DoubleServeFlowMap implements Mapper<DoubleServeFlow> {

    private static serveFlowToDomain(raw: any) {
        const flowOrError = ServiceFlow.create({ value: raw });

        flowOrError.isFailure && console.log(flowOrError.getErrorValue())

        return flowOrError.isSuccess ? flowOrError.getValue() : null;
    }

    public static toDto(flow: DoubleServeFlow | null | undefined) {
        if (!flow) {
            return null
        }
        return {
            servingPlayer: flow.servingPlayer,
            initialTeam: flow.initialTeam,
            servingTeam: flow.servingTeam,
            setNextFlow: flow.setNextFlow,
            initialReturningPlayer: flow.initialReturningPlayer,
            initialServingPlayer: flow.initialServingPlayer,
            returningPlayer: flow.returningPlayer,
            isFlowComplete: flow.isFlowComplete,
            actualSetOrder: flow.actualSetOrder,
            firstGameFlow: flow.firstGameFlow?.value,
            secondGameFlow: flow.secondGameFlow?.value,
            thirdGameFlow: flow.thirdGameFlow?.value,
            fourGameFlow: flow.fourGameFlow?.value,
            order: flow.order.getItems().map((flow) => flow.value),
            tiebreakFirstPointDone: flow.tiebreakFirstPointDone,
        }
    }

    public static toDomain(raw: any): DoubleServeFlow | null {
        let obj: any;
        if (typeof raw == 'string') {
            obj = JSON.parse(raw);
        } else {
            obj = raw;
        }

        if (!obj) {
            return null;
        }

        const firstGameFlow = this.serveFlowToDomain(obj.firstGameFlow);
        const secondGameFlow = this.serveFlowToDomain(obj.secondGameFlow);
        const thirdGameFlow = this.serveFlowToDomain(obj.thirdGameFlow);
        const fourGameFlow = this.serveFlowToDomain(obj.fourGameFlow);

        const order = ServiceOrder.create([firstGameFlow, secondGameFlow, thirdGameFlow, fourGameFlow,])

        if (order.isFailure) {
            return null
        }

        const flowOrError = DoubleServeFlow.create({
            servingPlayer: obj.servingPlayer,
            initialTeam: obj.initialTeam,
            servingTeam: obj.servingTeam,
            setNextFlow: obj.setNextFlow,
            initialReturningPlayer: obj.initialReturningPlayer,
            initialServingPlayer: obj.initialServingPlayer,
            returningPlayer: obj.returningPlayer,
            isFlowComplete: obj.isFlowComplete,
            actualSetOrder: obj.actualSetOrder,
            firstGameFlow,
            secondGameFlow,
            thirdGameFlow,
            fourGameFlow,
            order: order.getValue(),
            tiebreakFirstPointDone: obj.tiebreakFirstPointDone ?? false,
        })

        flowOrError.isFailure && console.log(flowOrError.getErrorValue())

        return flowOrError.isSuccess ? flowOrError.getValue() : null;
    }
}
