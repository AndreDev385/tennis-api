import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetPausedMatch } from "./getPausedMatch";
import { AppError } from "../../../../shared/core/AppError";

export class GetPausedMatchController extends BaseController {
    private readonly usecase: GetPausedMatch;

    constructor(usecase: GetPausedMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const { matchId } = req.params;

        const result = await this.usecase.execute({ matchId });

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
