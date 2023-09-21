import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { FeaturePlayers } from "./featurePlayers";
import { AppError } from "../../../../shared/core/AppError";

export class FeaturePlayersController extends BaseController {
    private readonly usecase: FeaturePlayers;

    constructor(usecase: FeaturePlayers) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const result = await this.usecase.execute(req.query as any);

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
