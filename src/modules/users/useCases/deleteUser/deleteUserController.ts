import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../infra/http/models/decodedRequest";
import { DeleteUser } from "./deleteUser";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class DeleteUserController extends BaseController {

    private usecase: DeleteUser;

    constructor(usecase: DeleteUser) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const { userId } = req.decoded

        const result = await this.usecase.execute(userId)

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                case AppError.NotFoundError:
                    return this.clientError(res, (error as AppError.NotFoundError).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())

            }
        }

        return this.ok(res, { "message": "Usuario eliminado con exito!" })
    }
}
