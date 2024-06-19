import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteHomeAd } from "./deleteHomeAd";
import { AppError } from "../../../../shared/core/AppError";

export class DeleteHomeAdCtrl extends BaseController {
    private readonly uc: DeleteHomeAd;

    constructor(uc: DeleteHomeAd) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response): Promise<any> {
        const { image } = req.params;

        const result = await this.uc.execute(image);

        if (result.isLeft()) {
            switch (result.value.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(res, result.value.getErrorValue().message);
                case AppError.NotFoundError:
                    return this.notFound(
                        res,
                        result.value.getErrorValue().message
                    );
            }
        }

        return this.ok(res, { message: "Patrocinante eliminado" });
    }
}
