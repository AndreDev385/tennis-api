import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteContest } from "./deleteContest";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteContestCtrl extends BaseController {
    private readonly uc: DeleteContest;

    constructor(uc: DeleteContest) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const { contestId } = req.params;

        const result = await this.uc.execute({ contestId })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Competencia eliminada" });
    }
}
