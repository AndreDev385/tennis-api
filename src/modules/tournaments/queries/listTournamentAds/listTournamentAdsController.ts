import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { ListTournamentAds } from "./listTournamentAds";

export class ListTournamentAdsCtrl extends BaseController {

    private readonly usecase: ListTournamentAds;

    constructor(usecase: ListTournamentAds) {
        super()
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {

        const { tournamentId } = req.params;

        const result = await this.usecase.execute({ tournamentId });

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value);
    }
}
