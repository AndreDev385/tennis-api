import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserDto } from "./createUserDto";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { CreateUserErrors } from "./createUserErrors";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class CreateUserController extends BaseController {
    private useCase: CreateUserUseCase;

    constructor(useCase: CreateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request, res: Response): Promise<any> {
        let dto: CreateUserDto = req.body as CreateUserDto;

        dto = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: TextUtils.sanitize(dto.email),
            ci: dto.ci,
            password: dto.password,
        };

        const result = await this.useCase.execute(dto);

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case CreateUserErrors.EmailAlreadyExistsError:
                    return this.conflict(
                        res,
                        (error as CreateUserErrors.EmailAlreadyExistsError).getErrorValue().message
                    );
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message)
                default:
                    return this.clientError(res, (error as Result<string>).getErrorValue());
            }
        }
        return this.ok(res, { message: "Registro exitoso" });
    }
}
