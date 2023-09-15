import { Response } from "express";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { CreateClub } from "./createClub";

export class CreateClubController extends BaseController {

    private readonly usecase: CreateClub;

    constructor(usecase: CreateClub) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message);

                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue());
            }
        }

        return this.ok(res, { message: "Club creado exitosamente" });
    }
}
