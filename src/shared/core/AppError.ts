import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(err: any) {
            super(false, {
                message: `An unexpected error occurred.`,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: An unexpected error occurred`);
            console.error(err);
        }
    }

    export class NotFoundError extends Result<UseCaseError> {
        public constructor(err: any) {
            super(false, {
                message: `Not found.`,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: Not found`);
            console.error(err);
        }
    }
}
