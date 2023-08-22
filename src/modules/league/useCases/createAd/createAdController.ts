import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { CreateAd } from "./createAd";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CreateAdController extends BaseController {

    usecase: CreateAd

    constructor(usecase: CreateAd) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const { link, clubId } = req.body;

        const result = await this.usecase.execute({
            file: req.file,
            link,
            clubId,
        })

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)

                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue());
            }
        }

        return this.ok(res, { message: "Publicidad agregada con exito" });
    }
}

