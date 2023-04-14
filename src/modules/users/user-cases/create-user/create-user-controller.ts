import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserUseCase } from "./create-user-use-case";
import { CreateUserDto } from "./create-user-dto";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { CreateUserErrors } from "./create-user-errors";

export class CreateUserController extends BaseController {
    private useCase: CreateUserUseCase;

    constructor(useCase: CreateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
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
            } else {
                return this.ok(res);
            }
        } catch (err) {
            return this.fail(res, err);
        }
    }
}
