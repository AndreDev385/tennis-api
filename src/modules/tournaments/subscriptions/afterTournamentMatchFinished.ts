import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { TournamentMatchFinished } from "../domain/events/tournamentMatchFinished";
import { CheckClashIsFinished } from "../usecase/checkBracketClash/check";
import { UpdateMatchBrackets } from "../usecase/updateMatchBrackets/updateBrackets";

export class AfterTournemntMatchFinished
    implements IHandle<TournamentMatchFinished>
{
    private updateBracketTree: UpdateMatchBrackets;
    private checkIfClashFinished: CheckClashIsFinished;

    constructor(
        updateBracket: UpdateMatchBrackets,
        checkClashFinish: CheckClashIsFinished
    ) {
        this.updateBracketTree = updateBracket;
        this.checkIfClashFinished = checkClashFinish;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.updateTree.bind(this) as any,
            TournamentMatchFinished.name
        );
        DomainEvents.register(
            this.checkIsFinish.bind(this) as any,
            TournamentMatchFinished.name
        );
    }

    private async checkIsFinish(event: TournamentMatchFinished): Promise<void> {
        const { match } = event;

        const result = await this.checkIfClashFinished.execute({
            matchId: match.matchId.id.toString(),
        });

        if (result.isLeft()) {
            console.log(
                `[AfterTournamentMatchFinished | CheckClash]: Failed to execute`
            );
            return;
        }

        console.log(
            `[AfterTournamentMatchFinished | CheckClash]: Successfully executed`
        );
    }

    private async updateTree(event: TournamentMatchFinished): Promise<void> {
        const { match } = event;

        const result = await this.updateBracketTree.execute({
            matchId: match.matchId.id.toString(),
        });

        if (result.isLeft()) {
            console.log(
                `[AfterTournamentMatchFinished | BracketTree]: Failed to execute`
            );
            return;
        }

        console.log(
            `[AfterTournamentMatchFinished | BracketTree]: Successfully executed`
        );
    }
}
