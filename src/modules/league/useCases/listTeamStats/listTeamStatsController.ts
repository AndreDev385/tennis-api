import { Request, Response } from "express";
import { ListTeamStats } from "./listTeamStats";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class ListTeamStatsController extends BaseController {
    usecase: ListTeamStats;

    constructor(usecase: ListTeamStats) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const result = await this.usecase.execute(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
