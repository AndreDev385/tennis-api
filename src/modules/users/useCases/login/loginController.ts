import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { LoginDto } from "./loginDto";
import { LoginUseCase } from "./loginUseCase";
import { LoginUseCaseErrors } from "./loginErrors";
import { AppError } from "../../../../shared/core/AppError";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class LoginController extends BaseController {
    private usecase: LoginUseCase;

    constructor(usecase: LoginUseCase) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const dto: LoginDto = req.body;

        const result = await this.usecase.execute(dto);

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
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
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error.getErrorValue() as UseCaseError).message
                    );
                default:
                    return this.clientError(
                        res,
                        error.getErrorValue() as string
                    );
            }
        }

        return this.ok(res, { access_token: result.value.getValue() });
    }
}
