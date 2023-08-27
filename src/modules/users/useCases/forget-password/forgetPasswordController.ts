import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ForgetPasswordUseCase } from "./forgetPasswordUseCase";
import { ForgetPasswordDto } from "./forgetPasswordDto";
import { AppError } from "../../../../shared/core/AppError";
import { ForgetPasswordErrors } from "./forgetPasswordErrors";
import { Result } from "../../../../shared/core/Result";

export class ForgetPasswordController extends BaseController {
    private useCase: ForgetPasswordUseCase;

    constructor(useCase: ForgetPasswordUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response) {
        let dto: ForgetPasswordDto = req.body;

        const result = await this.useCase.execute(dto);
        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                case ForgetPasswordErrors.EmailDoesNotExist:
                    return this.clientError(res, (error as ForgetPasswordErrors.EmailDoesNotExist).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue())
            }
        }
        this.ok(res, { message: "Correo enviado con exito!" });
    }
}
