import { Request, Response } from "express";
import { AddContestParticipants } from "./addParticipant";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Result } from "../../../../shared/core/Result";

export class AddContestParticipantsCtrl extends BaseController {
    private readonly usecase: AddContestParticipants;

    constructor(usecase: AddContestParticipants) {
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
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                default:
                    return this.clientError(
                        res,
                        (error as Result<any>).getErrorValue()
                    );
            }
        }

        return this.ok(res, {
            message: "Participantes agregados con exito",
            errors: result.value.getValue(),
        });
    }
}
