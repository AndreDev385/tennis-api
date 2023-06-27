import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { GetPlayerByUserId } from "./getPlayerByUserId";
import { AppError } from "../../../../shared/core/AppError";

export class GetPlayerByUserIdController extends BaseController {
    private usecase: GetPlayerByUserId;

    constructor(usecase: GetPlayerByUserId) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const id = req.decoded.userId;

        const result = await this.usecase.execute(id);

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
                    return this.clientError(res, "Ha ocurrido un error");
            }
        }

        return this.ok(res, result.value.getValue());
    }
}
