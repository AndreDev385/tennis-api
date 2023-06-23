import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListLeague } from "./listLeague";
import { AppError } from "../../../../shared/core/AppError";

export class ListLeagueController extends BaseController {
    private usecase: ListLeague;

    constructor(usecase: ListLeague) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute();

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);

                default:
                    return this.fail(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
