import { Response } from "express";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { CreateSeason } from "./createSeason";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CreateSeasonController extends BaseController {

    private usecase: CreateSeason;

    constructor(usecase: CreateSeason) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)

                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }

        return this.ok(res, { message: "Temporada creada con exito!" });
    }

}
