import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { MatchCancelled } from "../domain/events/matchCancelled";

import { FinishClash } from "../useCases/finishClash/finishClash";

export class AfterMatchCancelled implements IHandle<MatchCancelled> {

    private finishClash: FinishClash;

    constructor(finishClash: FinishClash) {
        this.setupSubscriptions();
        this.finishClash = finishClash;
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onFinishClash.bind(this) as any, MatchCancelled.name);
    }

    private async onFinishClash(event: MatchCancelled): Promise<void> {
        const { match } = event

        try {
            await this.finishClash.execute({ clashId: match.clashId.toString(), matchId: match.matchId.id.toString() })
            console.log(`[AfterMatchCancelled]: Successfully executed FinishClash use case AfterMatchCancelled`)
        } catch (error) {
            console.log(`[AfterMatchCancelled]: Failer to execute FinishClash use case AfterMatchCancelled`)
        }
    }
}
