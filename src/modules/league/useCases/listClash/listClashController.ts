import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListClash } from "./listClash";

export class ListClashController extends BaseController {
    private usecase: ListClash;

    constructor(usecase: ListClash) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const filters = req.query;

        const result = await this.usecase.execute(filters);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
