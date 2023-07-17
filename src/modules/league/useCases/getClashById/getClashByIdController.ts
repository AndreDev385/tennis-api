import { Request, Response } from "express";
import { GetClashById } from "./getClashById";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class GetClashByIdController extends BaseController {
    usecase: GetClashById;

    constructor(usecase: GetClashById) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const { clashId } = req.params;

        const response = await this.usecase.execute({ clashId });

        if (response.isLeft()) {
            const error = response.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );

                case AppError.NotFoundError:
                    return this.fail(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
            }
        }

        return this.ok(res, response.value.getValue());
    }
}
