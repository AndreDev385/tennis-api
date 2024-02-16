import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ClubEventCreated } from "../domain/events/eventCreated";
import { SendNotifications } from "../useCases/sendNotifications/sendNotifications";

class AfterClubEventCreated implements IHandle<ClubEventCreated> {
    private sendNotifications: SendNotifications;

    constructor(sendNotifications: SendNotifications) {
        this.setupSubscriptions();
        this.sendNotifications = sendNotifications;
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.execute.bind(this) as any,
            ClubEventCreated.name
        );
    }

    private async execute(event: ClubEventCreated) {
        const _event = event.event;

        try {
            await this.sendNotifications.execute({
                title: `¡Descubre las novedades que te esperan!`,
                body: `Han sido actualizadas las novedades, ven a ver los ultimos eventos en CTA.`,
                clubId: _event.clubId.id.toString(),
            });
            console.log(
                `[AfterClashFinished]: Successfully executed sendNotifications use case AfterAdCreated`
            );
        } catch (error) {
            console.log(
                `[AfterClashFinished]: Error executing sendNotifications use case AfterAdCreated`
            );
        }
    }
}

export { AfterClubEventCreated };
