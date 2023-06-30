import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreateMatchsError {
    export class PlayerRepeated extends Result<UseCaseError> {
        constructor(error: Error) {
            super(false, {
                message: error.message,
            } as UseCaseError);
        }
    }
}
