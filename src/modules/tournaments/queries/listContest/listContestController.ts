import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListContest } from "./listContest";
import { AppError } from "../../../../shared/core/AppError";

export class ListContestCtrl extends BaseController {
    private readonly usecase: ListContest;

    constructor(usecase: ListContest) {
        super();
        this.usecase = usecase;
    }
    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
            }
        }

        return this.ok(res, result.value);
    }
}
