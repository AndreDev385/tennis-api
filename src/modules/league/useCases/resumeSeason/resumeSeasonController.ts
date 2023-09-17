import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ResumeSeason } from "./resumeSeason";
import { AppError } from "../../../../shared/core/AppError";

export class ResumeSeasonController extends BaseController {

    private readonly usecase: ResumeSeason;

    constructor(usecase: ResumeSeason) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute();

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Temporada reanudada" })
    }

}
