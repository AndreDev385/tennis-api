import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserByEmailUseCase } from "./getUserByEmail";
import { AppError } from "../../../../shared/core/AppError";

export class GetUserByEmailController extends BaseController {
    private usecase: GetUserByEmailUseCase;

    constructor(usecase: GetUserByEmailUseCase) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const email = req.params["email"];

        const result = await this.usecase.execute(email);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
                default:
                    return this.clientError(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
