import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DeleteTournamentAd } from "./deleteTournamentAd";

export class DeleteTournamentAdCtrl extends BaseController {
    private readonly usecase: DeleteTournamentAd;

    constructor(usecase: DeleteTournamentAd) {
        super();
        this.usecase = usecase;
    }

    async executeImpl(req: Request, res: Response) {
        const { image } = req.params;

        const result = await this.usecase.execute({ image });

        if (result.isLeft()) {
            return this.notFound(res, result.value.getErrorValue().message);
        }

        return this.ok(res, { message: "Ad eliminada con exito" });
    }
}
