import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace ForgetPasswordErrors {
    export class EmailDoesNotExist extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `El correo ${email} no esta registrado.`,
            } as UseCaseError);
        }
    }
}
