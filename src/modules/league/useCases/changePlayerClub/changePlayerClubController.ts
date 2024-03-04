import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ChangePlayerClub } from "./changePlayerClub";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class ChangePlayerClubController extends BaseController {
    private readonly usecase: ChangePlayerClub;

    constructor(usecase: ChangePlayerClub) {
        super();
        this.usecase = usecase;
    }
    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.body);

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
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
                default:
                    return this.conflict(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, { message: "Jugador actualizado!" });
    }
}
