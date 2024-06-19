import { Request, Response } from "express";
import { AddParticipantsToTeam } from "./addParticipantsToTeam";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Result } from "../../../../shared/core/Result";

export class AddParticipantsToTeamCtrl extends BaseController {
    private readonly uc: AddParticipantsToTeam;

    constructor(uc: AddParticipantsToTeam) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.uc.execute(req.body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.NotFoundError:
                    return this.notFound(
                        res,
                        (error as AppError.NotFoundError).getErrorValue()
                            .message
                    );
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                default:
                    return this.fail(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, {
            message: "Participantes agregados con exito",
            errors: result.value.getValue(),
        });
    }
}
