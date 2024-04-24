import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetTournamentMatch } from "./getMatch";
import { AppError } from "../../../../shared/core/AppError";

export class GetTournamentMatchCtrl extends BaseController {
    private readonly usecase: GetTournamentMatch;

    constructor(usecase: GetTournamentMatch) {
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
                case AppError.NotFoundError:
                    return this.notFound(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
