import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteBrackets } from "./deleteBrackets";

export class DeleteBracketsCtrl extends BaseController {
    private readonly usecase: DeleteBrackets;

    constructor(usecase: DeleteBrackets) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, { "message": "Llaves eliminadas" });
    }
}
