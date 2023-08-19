import { Response } from "express";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { FinishSeason } from "./finishSeason";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";

export class FinishSeasonController extends BaseController {
    private usecase: FinishSeason;

    constructor(usecase: FinishSeason) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const result = await this.usecase.execute();

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);

                case AppError.NotFoundError:
                    return this.conflict(res, "No hay temporadas en curso");
            }
        }

        return this.ok(res, { message: "Temporada finalizada!" });
    }
}
