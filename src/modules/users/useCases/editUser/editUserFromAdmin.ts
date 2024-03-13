import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { EditUser } from "./editUser";
import { AppError } from "../../../../shared/core/AppError";
import { CreateUserErrors } from "../createUser/createUserErrors";
import { Result } from "../../../../shared/core/Result";

export class EditUserFromAdminController extends BaseController {
    private usecase: EditUser;

    constructor(usecase: EditUser) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { userId } = req.params;

        const result = await this.usecase.execute({ ...req.body, userId });

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
                case CreateUserErrors.EmailAlreadyExistsError:
                    return this.conflict(
                        res,
                        (
                            error as CreateUserErrors.EmailAlreadyExistsError
                        ).getErrorValue().message
                    );
                default:
                    return this.clientError(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, { message: "Usuario editado exitosamente" });
    }
}
