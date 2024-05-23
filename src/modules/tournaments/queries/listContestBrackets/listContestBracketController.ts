import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListContestBrackets } from "./listContestBrackets";

export class ListContestBracketsCtrl extends BaseController {
    private readonly usecase: ListContestBrackets;

    constructor(usecase: ListContestBrackets) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { contestId } = req.params;

        const result = await this.usecase.execute({ contestId, ...req.query });


        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        console.log(result.value[0].rightPlace.contestTeam, 'brackets');
        console.log(result.value[0].leftPlace.contestTeam, 'brackets');

        return this.ok(res, result.value);
    }
}
