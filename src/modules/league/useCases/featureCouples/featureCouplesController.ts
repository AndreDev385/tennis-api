import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { FeatureCouples } from "./featureCouples";
import { AppError } from "../../../../shared/core/AppError";

export class FeatureCouplesController extends BaseController {

    private readonly usecase: FeatureCouples;

    constructor(usecase: FeatureCouples) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
