import { Response } from "express";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { GetTeamRanking } from "./getTeamRanking";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class GetTeamRankingController extends BaseController {

    private usecase: GetTeamRanking;

    constructor(usecase: GetTeamRanking) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const { teamId } = req.params

        const result = await this.usecase.execute({ teamId });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)

                case AppError.NotFoundError:
                    return this.clientError(res, (error as AppError.UnexpectedError).getErrorValue().message)
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
