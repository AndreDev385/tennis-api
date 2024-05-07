import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PaginateMatches } from "./paginateMatches";

export class PaginateMatchesCtrl extends BaseController {

    private readonly usecase: PaginateMatches

    constructor(usecase: PaginateMatches) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        console.log(result);

        return this.ok(res, result.value.getValue());
    }
}
