import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListAds } from "./listAds";

export class ListAdsController extends BaseController {

    private usecase: ListAds;

    constructor(usecase: ListAds) {
        super();
        this.usecase = usecase
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message)
        }

        return this.ok(res, result.value.getValue());
    }
}
