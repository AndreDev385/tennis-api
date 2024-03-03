import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteUser } from "./deleteUser";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class DeleteUserFromAdmin extends BaseController {
    private readonly usecase: DeleteUser;

    constructor(usecase: DeleteUser) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { userId } = req.params;

        const result = await this.usecase.execute(userId);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, (error as AppError.NotFoundError).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue());
            }
        }

        return this.ok(res, { "message": "Usuario eliminado!" })
    }
}
