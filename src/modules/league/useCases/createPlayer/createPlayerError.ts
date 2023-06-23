import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreatePlayerErrors {
    export class PlayerAlreadyExistError extends Result<UseCaseError> {
        constructor(userId: string) {
            super(false, {
                message: `El usuario con id ${userId} ya existe`,
            } as UseCaseError);
        }
    }

    export class UserDoesNotExist extends Result<UseCaseError> {
        constructor(userId: string) {
            super(false, {
                message: `El usuario con id ${userId} no existe o fue eliminado`,
            } as UseCaseError);
        }
    }
    export class ClubDoesNotExist extends Result<UseCaseError> {
        constructor(clubId: string) {
            super(false, {
                message: `El club con id ${clubId} no existe o fue eliminado`,
            } as UseCaseError);
        }
    }
}
