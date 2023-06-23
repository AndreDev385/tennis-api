import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateClashUseCase } from "./createClash";
import { CreateClashDto } from "./createClashDto";
import { AppError } from "../../../../shared/core/AppError";

export class CreateClashController extends BaseController {
    usecase: CreateClashUseCase;

    constructor(usecase: CreateClashUseCase) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const dto: CreateClashDto = req.body;

        const result = await this.usecase.execute(dto);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, (error as AppError.UnexpectedError).getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, (error as AppError.NotFoundError).getErrorValue().message)
                default:
                    return this.clientError(res, (error.getErrorValue()) as string);
            }
        }

        return this.created(res);
    }
}
