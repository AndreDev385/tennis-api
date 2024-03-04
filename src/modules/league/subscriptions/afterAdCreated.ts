import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { AdCreated } from "../domain/events/adCreated";
import { SendNotifications } from "../useCases/sendNotifications/sendNotifications";

class AfterAdCreated implements IHandle<AdCreated> {
    private sendNotifications: SendNotifications;

    constructor(sendNotifications: SendNotifications) {
        this.setupSubscriptions()
        this.sendNotifications = sendNotifications;
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.execute.bind(this) as any,
            AdCreated.name,
        );
    }

    private async execute(event: AdCreated) {
        const { ad } = event;

        try {
            await this.sendNotifications.execute({
                title: `¡Nuevo patrocinador se une al club!`,
                body: `Tenemos un nuevo patrocinante que se une a nuestro club para apoyar nuestro crecimiento.`,
                clubId: ad.clubId.id.toString(),
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

export { AfterAdCreated };
