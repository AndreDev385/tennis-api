import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListTeams } from "./listTeams";

export class ListTeamsController extends BaseController {

    private usecase: ListTeams;

    constructor(usecase: ListTeams) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message)
        }

        return this.ok(res, result.value.getValue());
    }

}
