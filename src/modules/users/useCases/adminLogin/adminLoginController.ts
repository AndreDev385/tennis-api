import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AdminLogin } from "./adminLogin";
import { AppError } from "../../../../shared/core/AppError";
import { LoginUseCaseErrors } from "../login/loginErrors";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class AdminLoginController extends BaseController {

    usecase: AdminLogin;

    constructor(usecase: AdminLogin) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                case LoginUseCaseErrors.EmailDoesNotExist:
                    return this.clientError(
                        res,
                        (error.getErrorValue() as UseCaseError).message
                    );
                case LoginUseCaseErrors.PasswordDoesntMatchError:
                    return this.clientError(
                        res,
                        (error.getErrorValue() as UseCaseError).message
                    );
                default:
                    return this.clientError(res, error.getErrorValue() as string)
            }
        }

        return this.ok(res, { access_token: result.value.getValue() });

    }

}
