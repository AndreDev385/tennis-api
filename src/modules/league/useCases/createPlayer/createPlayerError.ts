import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreatePlayerErrors {
    export class PlayerAlreadyExistError extends Result<UseCaseError> {
        constructor(playerName: string) {
            super(false, {
                message: `El jugador ${playerName} ya se encuentra registrado.`,
            } as UseCaseError);
        }
    }

    export class UserDoesNotExist extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `El usuario no existe o fue eliminado.`,
            } as UseCaseError);
        }
    }
    export class ClubDoesNotExist extends Result<UseCaseError> {
        constructor(clubName: string) {
            super(false, {
                message: `El club ${clubName} no existe o fue eliminado.`,
            } as UseCaseError);
        }
    }
    export class WrongCode extends Result<UseCaseError> {
        constructor(code: string) {
            super(false, {
                message: `El codigo ${code} no es valido.`,
            } as UseCaseError);
        }
    }
}
