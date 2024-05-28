import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetContest } from "./getContest";
import { AppError } from "../../../../shared/core/AppError";

export class GetContestCtrl extends BaseController {
    private readonly usecase: GetContest;

    constructor(usecase: GetContest) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { contestId } = req.params;

        if (!contestId) {
            return this.clientError(res, "contestId es requerido");
        }

        const result = await this.usecase.execute({ contestId, ...req.query });

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, result.value.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(
                        res,
                        result.value.getErrorValue().message
                    );
            }
        }

        return this.ok(res, result.value);
    }
}
