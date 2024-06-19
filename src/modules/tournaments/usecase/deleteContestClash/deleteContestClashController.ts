import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteContestClash } from "./delete";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteContestClashCtrl extends BaseController {
    private readonly uc: DeleteContestClash;

    constructor(uc: DeleteContestClash) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const { contestClashId } = req.params;

        const result = await this.uc.execute({ contestClashId });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, { message: "Encuentro eliminado con exito" });
    }
}
