import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListHomeAds } from "./listHomeAds";

export class ListHomeAdsCtrl extends BaseController {
    private readonly uc: ListHomeAds;
    constructor(uc: ListHomeAds) {
        super();
        this.uc = uc;
    }
    async executeImpl(req: Request, res: Response) {
        const result = await this.uc.execute(req.body);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value);
    }
}
