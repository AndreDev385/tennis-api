import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ClashFinished } from "../domain/events/clashFinished";
import { UpdateTeamStats } from "../useCases/updateTeamStats/updateTeamStats";

export class AfterClashFinish implements IHandle<ClashFinished> {
    private updateTeamStats: UpdateTeamStats;

    constructor(usecase: UpdateTeamStats) {
        this.setupSubscriptions();
        this.updateTeamStats = usecase;
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.onUpdateTeamStats.bind(this),
            ClashFinished.name,
        );
    }

    private async onUpdateTeamStats(event: ClashFinished) {
        const { clash } = event;
        try {
            await this.updateTeamStats.execute({
                clashId: clash.clashId.id.toString(),
            });
            console.log(
                `[AfterClashFinished]: Successfully executed UpdateTeamStats use case AfterClashFinished`
            );
        } catch (error) {
            console.log(
                `[AfterClashFinished]: Failer to execute UpdateTeamStats use case AfterClashFinished`
            );
        }
    }
}
