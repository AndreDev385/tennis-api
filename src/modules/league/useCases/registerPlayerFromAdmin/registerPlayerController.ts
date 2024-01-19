import { Request, Response } from "express";
import { RegisterPlayer } from "./registerPlayer";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class RegisterPlayerController extends BaseController {
    private usecase: RegisterPlayer;

    constructor(usecase: RegisterPlayer) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message);
                case AppError.NotFoundError:
                    return this.clientError(res, (error as AppError.UnexpectedError).getErrorValue().message);
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }

        return this.created(res);
    }
}
