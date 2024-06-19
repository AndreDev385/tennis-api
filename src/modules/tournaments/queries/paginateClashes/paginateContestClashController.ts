import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PaginateClashes } from "./paginate";

export class PaginateContestClashesCtrl extends BaseController {
    private readonly uc: PaginateClashes;

    constructor(uc: PaginateClashes) {
        super();
        this.uc = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.uc.execute(req.query as any);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
