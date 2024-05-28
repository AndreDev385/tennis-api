import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ContestClashFinished } from "../domain/events/contestClashFinished";
import { UpdateClashBrackets } from "../usecase/updateClashBrackets/update";

export class AfterContestClashFinished implements IHandle<UpdateClashBrackets> {
    private updateBracketTree: UpdateClashBrackets;

    constructor(usecase: UpdateClashBrackets) {
        this.updateBracketTree = usecase;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.updateTree.bind(this) as any,
            ContestClashFinished.name
        );
    }

    private async updateTree(event: ContestClashFinished): Promise<void> {
        const { clash } = event;

        const result = await this.updateBracketTree.execute({
            clashId: clash.contestClashId.id.toString(),
        });

        if (result.isLeft()) {
            console.log(`[AfterContestClashFinished]: Failed to execute`);
            return;
        }

        console.log(`[AfterContestClashFinished]: Successfully executed`);
    }
}
