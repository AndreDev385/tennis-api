import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CancelMatch } from "./cancelMatch";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CancelMatchController extends BaseController {

    usecase: CancelMatch;

    constructor(usecase: CancelMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        try {
            if (typeof req.body['tracker'] == 'string') {
                console.log('string?')
                req.body['tracker'] = JSON.parse(req.body['tracker']);
            }
            if (typeof req.body['sets'] == 'string') {
                console.log('string?')
                req.body['sets'] = JSON.parse(req.body['sets']);
            }
        } catch (error) {
            return this.clientError(res, "JSON invalido");
        }

        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                case AppError.NotFoundError:
                    return this.clientError(res, (error as AppError.NotFoundError).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }

        return this.ok(res, { "message": "Partido cancelado!" })
    }

}
