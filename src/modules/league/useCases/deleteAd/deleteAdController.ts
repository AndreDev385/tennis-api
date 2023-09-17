import { Response, Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteAd } from "./deleteAd";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteAdController extends BaseController {

    private readonly usecase: DeleteAd;

    constructor(usecase: DeleteAd) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const { adId } = req.params;

        const result = await this.usecase.execute({ adId });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message)
                case AppError.NotFoundError:
                    return this.fail(res, error.getErrorValue().message)
            }
        }

        return this.ok(res, { message: "Ad eliminada con exito!" })
    }
}
