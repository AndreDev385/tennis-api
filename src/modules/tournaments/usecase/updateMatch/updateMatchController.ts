import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { UpdateMatch } from "./updateMatch";
import { AppError } from "../../../../shared/core/AppError";

export class UpdateTournamentMatchCtrl extends BaseController {
    private readonly usecase: UpdateMatch;

    constructor(usecase: UpdateMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        let body = req.body.data;

        if (typeof req.body.data == 'string') {
            body = JSON.parse(body);
        }

        const result = await this.usecase.execute(body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, { message: "ok" });
    }
}
