import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListMatchs } from "./listMatchs";

export class ListMatchsController extends BaseController {
    usecase: ListMatchs;

    constructor(usecase: ListMatchs) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            const error = result.value;
            return this.fail(res, error.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
