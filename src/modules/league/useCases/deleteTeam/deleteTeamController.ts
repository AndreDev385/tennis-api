import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteTeam } from "./deleteTeam";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteTeamController extends BaseController {

    private readonly usecase: DeleteTeam;
    constructor(usecase: DeleteTeam) {
        super();
        this.usecase = usecase;
    }
    async executeImpl(req: Request, res: Response) {

        const { teamId } = req.params

        const result = await this.usecase.execute({ teamId });

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Equipo eliminado con exito!" });
    }
}
