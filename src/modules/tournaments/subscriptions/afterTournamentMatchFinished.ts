import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { TournamentMatchFinished } from "../domain/events/tournamentMatchFinished";
import { UpdateBrackets } from "../usecase/updateBrackets/updateBrackets";

export class AfterTournemntMatchFinished
    implements IHandle<AfterTournemntMatchFinished>
{
    private updateBracketTree: UpdateBrackets;

    constructor(usecase: UpdateBrackets) {
        this.updateBracketTree = usecase;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.updateTree.bind(this) as any,
            TournamentMatchFinished.name
        );
    }

    private async updateTree(event: TournamentMatchFinished): Promise<void> {
        const { match } = event;

        const result = await this.updateBracketTree.execute({
            matchId: match.matchId.id.toString(),
        });

        if (result.isLeft()) {
            console.log(`[AfterTournamentMatchFinished]: Failed to execute`);
            return;
        }

        console.log(`[AfterTournamentMatchFinished]: Successfully executed`);
    }
}
