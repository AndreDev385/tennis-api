import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../infra/http/models/decodedRequest";
import { CreateUserUseCase } from "./createUserUseCase";
import { AppError } from "../../../../shared/core/AppError";
import { CreateUserDto } from "./createUserDto";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { CreateUserErrors } from "./createUserErrors";
import { Result } from "../../../../shared/core/Result";

export class CreateTrackerController extends BaseController {

    private usecase: CreateUserUseCase;

    constructor(usecase: CreateUserUseCase) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {
        let dto: CreateUserDto = req.body as CreateUserDto;

        dto = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: TextUtils.sanitize(dto.email),
            password: dto.password,
            canTrack: true,
        };

        const result = await this.usecase.execute(dto);

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
