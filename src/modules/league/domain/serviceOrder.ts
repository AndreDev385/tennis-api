import { Result } from "../../../shared/core/Result";
import { WatchedList } from "../../../shared/domain/WatchedList";
import { ServiceFlow } from "./doubleServeFlow";

export class ServiceOrder extends WatchedList<ServiceFlow> {
    private constructor(initialServiceFlow: Array<ServiceFlow>) {
        super(initialServiceFlow);
    }

    private static validate(values: Array<ServiceFlow | null>): boolean {
        for (const v of values) {
            if (!v) {
                return false
            }
        }
        return values.length == 4;
    }

    public static create(values: Array<ServiceFlow | null> = []): Result<ServiceOrder> {
        if (!this.validate(values)) {
            return Result.fail(
                `Orden de saques invalido. La logitud deberia ser 4, obtenido ${values.length}`,
            );
        }

        return Result.ok(new ServiceOrder(values as Array<ServiceFlow>));
    }

    public compareItems(a: ServiceFlow, b: ServiceFlow): boolean {
        return a.equals(b)
    }
}
