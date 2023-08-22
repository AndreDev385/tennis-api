import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ClashFinished } from "../domain/events/clashFinished";
import { UpdateTeamRanking } from "../useCases/updateTeamRanking/updateTeamRanking";
import { UpdateTeamStats } from "../useCases/updateTeamStats/updateTeamStats";

export class AfterClashFinish implements IHandle<ClashFinished> {
    private updateTeamStats: UpdateTeamStats;
    private updateTeamRanking: UpdateTeamRanking

    constructor(updateTeamStats: UpdateTeamStats, updateTeamRanking: UpdateTeamRanking) {
        this.setupSubscriptions();
        this.updateTeamStats = updateTeamStats;
        this.updateTeamRanking = updateTeamRanking
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
                `[AfterClashFinished]: Fail to execute UpdateTeamStats use case AfterClashFinished`
            );
        }

        try {
            await this.updateTeamRanking.execute({
                clashId: clash.clashId.id.toString(),
            })
            console.log(
                `[AfterClashFinished]: Successfully executed UpdateTeamRanking use case AfterClashFinished`
            );
        } catch (error) {
            console.log(
                `[AfterClashFinished]: fail to execute UpdateTeamRanking use case AfterClashFinished`
            );
        }
    }
}
