import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ProvisionalPasswordGranted } from "../domain/events/provisionalPasswordGranted";
import { SendProvisionalPassword } from "../useCases/sendProvisionalPassword/sendProvisionalPassword";

export class AfterProvisionalPasswordGranted implements IHandle<ProvisionalPasswordGranted> {

    private readonly usecase: SendProvisionalPassword;

    constructor(uc: SendProvisionalPassword) {
        this.usecase = uc;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.onSendProvisionalPassword.bind(this) as any,
            ProvisionalPasswordGranted.name,
        );
    }

    private async onSendProvisionalPassword(event: ProvisionalPasswordGranted) {
        const { user, password } = event;
        try {
            const result = await this.usecase.execute({ email: user.email!.value, password })
            if (result.isLeft()) {
                console.log(
                    `[AfterProvisionalPasswordGranted]: Fail to execute use case`
                );
                return
            }
            console.log(
                `[AfterProvisionalPasswordGranted]: Successfully executed use case`
            );
        } catch (error) {
            console.log(
                `[AfterProvisionalPasswordGranted]: Fail to execute use case`
            );
        }
    }
}
