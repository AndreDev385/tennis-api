import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { SubscribeClub } from "./subscribeClub";
import { Request, Response } from "express";

export class SubscribeClubController extends BaseController {
    private usecase: SubscribeClub;

    constructor(usecase: SubscribeClub) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { clubId } = req.params;

        const result = await this.usecase.execute({ clubId });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case AppError.NotFoundError:
                    return this.notFound(res, error.getErrorValue().message);
                case AppError.UnexpectedError:
                    return this.fail(res, error.getErrorValue().message);
            }
        }

        return this.ok(res, { message: "Club subscrito" });
    }
}
