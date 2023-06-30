import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListSeasons } from "./listSeasons";
import { AppError } from "../../../../shared/core/AppError";

export class ListSeasonsController extends BaseController {
    useCase: ListSeasons;

    constructor(useCase: ListSeasons) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.useCase.execute(req.query);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                default:
                    return this.clientError(
                        res,
                        error.getErrorValue() as string
                    );
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
