import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreateClashErrors {
    export class ClashAlreadyExistError extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Ya existe un encuentro con los equipos seleccionados`,
            } as UseCaseError);
        }
    }
}
