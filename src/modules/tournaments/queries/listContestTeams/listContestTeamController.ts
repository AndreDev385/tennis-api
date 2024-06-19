import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListContestTeams } from "./listContestTeams";

export class ListContestTeamsCtrl extends BaseController {
    private readonly usecase: ListContestTeams;

    constructor(uc: ListContestTeams) {
        super();
        this.usecase = uc;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value);
    }
}
