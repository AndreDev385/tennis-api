import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeletePlayer } from "./deletePlayer";
import { AppError } from "../../../../shared/core/AppError";

export class DeletePlayerController extends BaseController {
    private readonly usecase: DeletePlayer;

    constructor(usecase: DeletePlayer) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { playerId } = req.params;

        if (!playerId) {
            return this.clientError(res, "Player id es requerido");
        }

        const result = await this.usecase.execute({ playerId });

        if (result.isLeft()) {
            const error = result.value;
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, { message: "jugador eliminado" });
    }
}
