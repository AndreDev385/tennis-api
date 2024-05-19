import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateClashMatches } from "./createMatches";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CreateClashMatchesCtrl extends BaseController {
    private readonly uc: CreateClashMatches;

    constructor(uc: CreateClashMatches) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.uc.execute(req.body);

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
                    return this.notFound(
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

        return this.ok(res, { message: "Partidos creados exitosamente!" });
    }
}
