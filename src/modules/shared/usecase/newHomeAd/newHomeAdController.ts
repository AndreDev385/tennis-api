import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { NewHomeAd } from "./newHomeAd";
import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";

export class NewHomeAdCtrl extends BaseController {
    private readonly uc: NewHomeAd;

    constructor(uc: NewHomeAd) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.uc.execute({
            ...req.body,
            file: req.file,
        });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.UnexpectedError:
                    return this.fail(
                        res,
                        (error as AppError.UnexpectedError).getErrorValue()
                            .message
                    );
                default:
                    return this.clientError(
                        res,
                        (error as Result<string>).getErrorValue()
                    );
            }
        }

        return this.ok(res, { message: "Publicidad agreagada con exito" });
    }
}
