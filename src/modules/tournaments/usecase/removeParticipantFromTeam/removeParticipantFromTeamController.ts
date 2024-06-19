import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { RemoveParticipantFromTeam } from "./remove";
import { AppError } from "../../../../shared/core/AppError";

export class RemoveParticipantFromTeamCtrl extends BaseController {
    private readonly usecase: RemoveParticipantFromTeam;
    constructor(uc: RemoveParticipantFromTeam) {
        super();
        this.usecase = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.body);

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, { message: "Jugador removido del equipo" });
    }
}
