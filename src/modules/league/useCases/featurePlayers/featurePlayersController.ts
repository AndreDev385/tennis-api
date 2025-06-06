import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { FeaturePlayers } from "./featurePlayers";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class FeaturePlayersController extends BaseController {
    private readonly usecase: FeaturePlayers;

    constructor(usecase: FeaturePlayers) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        req.query['isDouble'] = JSON.parse(req.query.isDouble as string)

        const result = await this.usecase.execute(req.query as any);

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
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
