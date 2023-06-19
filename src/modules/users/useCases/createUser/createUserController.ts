import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserDto } from "./createUserDto";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { CreateUserErrors } from "./createUserErrors";

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
            password: dto.password,
        };

        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case CreateUserErrors.EmailAlreadyExistsError:
                        return this.conflict(
                            res,
                            error.getErrorValue().message
                        );
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }
            return this.ok(res, { message: "Registro exitoso" });
        } catch (err) {
            return this.fail(res, err.message);
        }
    }
}
