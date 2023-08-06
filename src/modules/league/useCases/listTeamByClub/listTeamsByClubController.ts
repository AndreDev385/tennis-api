import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListTeamsByClub } from "./listTeamsByClub";

export class ListTeamsByClubController extends BaseController {
    usecase: ListTeamsByClub;

    constructor(usecase: ListTeamsByClub) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { clubId } = req.params;

        const result = await this.usecase.execute(clubId);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
