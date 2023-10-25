import { Request, Response } from "express";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteClash } from "./deleteClash";

export class DeleteClashController extends BaseController {

    private readonly usecase: DeleteClash;

    constructor(usecase: DeleteClash) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const { clashId } = req.params;

        const result = await this.usecase.execute(clashId);

        if (result.isLeft()) {
            const error = result.value
            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)

                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { 'message': "Encuentro eliminado con exito!" })
    }
}
