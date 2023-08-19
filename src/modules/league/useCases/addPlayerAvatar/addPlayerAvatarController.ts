import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../../users/infra/http/models/decodedRequest";
import { AddPlayerAvatar } from "./addPlayerAvatar";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class AddPlayerAvatarController extends BaseController {

    usecase: AddPlayerAvatar;

    constructor(usecase: AddPlayerAvatar) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const result = await this.usecase.execute({
            file: req.file,
            userId: req.decoded.userId
        })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)

                case AppError.NotFoundError:
                    return this.clientError(res, (error as AppError.NotFoundError).getErrorValue().message)

                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }

        return this.ok(res, { message: "Imagen de perfil actualizada" });
    }
}
