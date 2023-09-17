import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { AppError } from "../../../../shared/core/AppError";
import { DeleteEvent } from "./deleteEvent";

export class DeleteEventController extends BaseController {

    private readonly usecase: DeleteEvent;

    constructor(usecase: DeleteEvent) {
        super();
        this.usecase = usecase
    }

    async executeImpl(req: Request, res: Response) {

        const { eventId } = req.params

        const result = await this.usecase.execute({ eventId });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Evento eliminado con exito!" })
    }
}
