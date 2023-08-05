import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ValidatePasswordCode } from "./validatePasswordCode";
import { AppError } from "../../../../shared/core/AppError";

export class ValidatePasswordCodeController extends BaseController {

    private usecase: ValidatePasswordCode;

    constructor(usecase: ValidatePasswordCode) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.clientError(res, "Codigo invalido")
            }
        }

        return this.ok(res, { message: "Codigo validado con exito" });
    }
}
