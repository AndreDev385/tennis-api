import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetPlayerStats, GetPlayerStatsRequest } from "./getPlayerStats";
import { AppError } from "../../../../shared/core/AppError";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { Result } from "../../../../shared/core/Result";

export class GetPlayerStatsController extends BaseController {
    private usecase: GetPlayerStats;

    constructor(usecase: GetPlayerStats) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const { userId, isPlayer } = req.decoded;

        if (!isPlayer) {
            return this.unauthorized(res);
        }

        const result = await this.usecase.execute({
            userId,
            ...req.query,
        } as GetPlayerStatsRequest);

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
