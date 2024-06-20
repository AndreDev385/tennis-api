import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteTournament } from "./deleteTournament";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteTournamentCtrl extends BaseController {
    private uc: DeleteTournament;

    constructor(uc: DeleteTournament) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {

        const { tournamentId } = req.params;

        const result = await this.uc.execute({ tournamentId })

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Torneo eliminado" })
    }
}
