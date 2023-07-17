import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { MatchFinished } from "../domain/events/matchFinished";
import { FinishClash } from "../useCases/finishClash/finishClash";

export class AfterMatchFinished implements IHandle<MatchFinished> {

    private finishClash: FinishClash;

    constructor(finishClash: FinishClash) {
        this.setupSubscriptions();
        this.finishClash = finishClash;
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onFinishClash.bind(this), MatchFinished.name);
    }

    private async onFinishClash(event: MatchFinished): Promise<void> {
        const { match } = event

        try {
            await this.finishClash.execute({ clashId: match.clashId.id.toString(), matchId: match.matchId.id.toString() })
            console.log(`[AfterMatchFinished]: Successfully executed FinishClash use case AfterMatchFinished`)
        } catch (error) {
            console.log(`[AfterMatchFinished]: Failer to execute FinishClash use case AfterMatchFinished`)
        }
    }

}
