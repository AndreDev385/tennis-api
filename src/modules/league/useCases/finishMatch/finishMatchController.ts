import { Request, Response } from "express";
import { FinishMatch } from "./finishMatch";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class FinishMatchController extends BaseController {
    private usecase: FinishMatch;

    constructor(usecase: FinishMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        try {
            req.body['tracker'] = JSON.parse(req.body['tracker']);
            req.body['sets'] = JSON.parse(req.body['sets']);
        } catch (error) {
            return this.clientError(res, "JSON invalido");
        }

        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                case AppError.NotFoundError:
                    return this.clientError(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
                default:
                    return this.clientError(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, { message: "Partido finalizado!" });
    }
}
