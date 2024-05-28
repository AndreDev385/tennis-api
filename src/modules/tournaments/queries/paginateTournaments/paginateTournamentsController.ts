import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { paginateTournaments } from "./paginateTournaments";

export class PaginateTournamentsController extends BaseController {
    async executeImpl(req: Request, res: Response) {
        const result = await paginateTournaments(req.query);

        if (result.isLeft()) {
            return this.fail(res, result.value.getErrorValue().message);
        }

        return this.ok(res, result.value.getValue());
    }
}
