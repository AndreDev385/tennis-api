import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateClashMatchsDto } from "./createMatchDto";
import { CreateMatch } from "./createMatch";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";
import { CreateMatchsError } from "./createMatchError";

export class CreateMatchController extends BaseController {
    usecase: CreateMatch;

    constructor(usecase: CreateMatch) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const dto: CreateClashMatchsDto = req.body;

        if (typeof dto.matchs == 'string') {
            dto.matchs = JSON.parse(dto.matchs);
        }

        const result = await this.usecase.execute(dto);

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
                    return this.notFound(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                case CreateMatchsError.PlayerRepeated:
                    return this.clientError(
                        res,
                        (
                            error as CreateMatchsError.PlayerRepeated
                        ).getErrorValue().message
                    );
                default:
                    return this.clientError(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.created(res);
    }
}
