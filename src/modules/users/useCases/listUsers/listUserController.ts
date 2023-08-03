import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedRequest } from "../../infra/http/models/decodedRequest";
import { ListUsers } from "./listUsers";

export class ListUserController extends BaseController {

    private usecase: ListUsers

    constructor(usecase: ListUsers) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: DecodedRequest, res: Response) {

        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message)
        }

        return this.ok(res, result.value.getValue());
    }
}
