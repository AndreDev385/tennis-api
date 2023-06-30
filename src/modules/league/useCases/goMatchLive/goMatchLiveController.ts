import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GoMatchLive } from "./goMatchLive";
import { GoMatchLiveRequest } from "./goMatchLiveRequest";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class GoMatchLiveController extends BaseController {
    usecase: GoMatchLive;

    constructor(usecase: GoMatchLive) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const body: GoMatchLiveRequest = req.body;

        const result = await this.usecase.execute(body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.NotFoundError:
                    return this.clientError(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
                default:
                    return this.fail(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, { message: "Partido en vivo!" });
    }
}
