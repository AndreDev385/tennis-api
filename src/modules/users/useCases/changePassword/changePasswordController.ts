import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ChangePassword } from "./changePassword";
import { DecodedRequest } from "../../infra/http/models/decodedRequest";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class ChangePasswordController extends BaseController {
    private usecase: ChangePassword;

    constructor(usecase: ChangePassword) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        const { decoded } = req;
        const { newPassword } = req.body;

        const result = await this.usecase.execute({
            userId: decoded.userId,
            newPassword,
        });

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
                    return this.clientError(
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

        return this.ok(res, { message: "Contraseña actualizada!" });
    }
}
