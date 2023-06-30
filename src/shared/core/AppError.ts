import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(err: any) {
            super(false, {
                message: `Ha ocurrido un error.`,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: Ha ocurrido un error`);
            console.error(err);
        }
    }

    export class NotFoundError extends Result<UseCaseError> {
        public constructor(err: any) {
            super(false, {
                message: err.message || err,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: No encontrado`);
            console.error(err);
        }
    }
}
